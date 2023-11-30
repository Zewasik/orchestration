const { Pool } = require("pg")

const pool = new Pool({
  user: "inventory",
  host: "localhost",
  database: "movies",
  password: "inventory",
  port: 5432,
})

function getAllMovies(req, res) {
  pool
    .query("SELECT * FROM movies")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(500)
      res.end()
    })
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

module.exports = {
  getAllMovies,
  createMovie,
  deleteAllMovies,
}
