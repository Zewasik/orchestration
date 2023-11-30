const { Pool } = require("pg")

const pool = new Pool({
  user: "inventory",
  host: "localhost",
  database: "movies",
  password: "inventory",
  port: 5432,
})

async function getAllMovies(req, res) {
  await pool
    .query("SELECT * FROM movies")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(500)
      res.end()
    })
}

module.exports = {
  getAllMovies,
}
