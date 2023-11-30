const express = require("express")
const router = express.Router()

module.exports = function routes(controllers) {
  router.get("/movies", controllers.getAllMovies)

  return router
}
