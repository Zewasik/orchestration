const { Pool } = require("pg")

const pool = new Pool({
  user: "inventory",
  host: "localhost",
  database: "movies",
  password: "inventory",
  port: 5432,
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
    .query("INSERT INTO movies(title, description) VALUES($1, $2)", [
      title,
      description,
    ])
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
    .then((result) => res.json(result.rows[0] || null))
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
    .query(`UPDATE movies SET ${setClause.join(", ")} WHERE id = $1`, values)
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
