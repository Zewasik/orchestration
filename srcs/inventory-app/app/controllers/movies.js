const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = require('./config/config')
const { Pool } = require("pg")

const pool = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
})

function getAllMovies(req, res) {
  const title = `%${req.query.title || ""}%`

  pool
    .query("SELECT * FROM movies WHERE title ILIKE $1", [title])
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

function deleteAllMovies(req, res) {
  pool
    .query("DELETE FROM movies")
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

function createMovie(req, res) {
  const { title, description } = req.body

  pool
    .query(
      "INSERT INTO movies(title, description) VALUES($1, $2) RETURNING id, title, description",
      [title, description]
    )
    .then((result) => {
      res.status(201)
      res.json(result.rows[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

function getMovieById(req, res) {
  const { id } = req.params

  pool
    .query("SELECT * FROM movies WHERE id = $1", [id])
    .then((result) => {
      if (result.rowCount == 0) {
        res.status(404)
        return
      }
      res.json(result.rows[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

function updateMovieById(req, res) {
  const { id } = req.params
  let setClause = []
  let values = [id]

  Object.entries(req.body).forEach(([key, value]) => {
    setClause.push(`${key} = $${setClause.length + 2}`)
    values.push(value)
  })

  pool
    .query(
      `UPDATE movies SET ${setClause.join(
        ", "
      )} WHERE id = $1 RETURNING id, title, description`,
      values
    )
    .then((result) => {
      if (result.rowCount == 0) {
        res.status(404)
        return
      }
      res.json(result.rows[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

function deleteMovieById(req, res) {
  const { id } = req.params

  pool
    .query(`DELETE FROM movies WHERE id = $1`, [id])
    .then((result) => {
      if (result.rowCount == 0) {
        res.status(404)
        return
      }
      res.status(204)
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
    })
    .finally(() => res.end())
}

module.exports = {
  getAllMovies,
  createMovie,
  deleteAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
}
