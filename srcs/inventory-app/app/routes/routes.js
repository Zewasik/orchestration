const express = require("express")
const router = express.Router()

module.exports = function routes(controllers) {
  router.get("/movies", controllers.getAllMovies)
  router.post("/movies", controllers.createMovie)
  router.delete("/movies", controllers.deleteAllMovies)

  router.get("/movies/:id", controllers.getMovieById)
  router.put("/movies/:id", controllers.updateMovieById)

  return router
}
