const express = require("express")
const router = express.Router()

module.exports = function routes(controllers) {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Movie:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: The movie's ID.
   *         title:
   *           type: string
   *           description: The movie's title.
   *         description:
   *           type: string
   *           description: The movie's description.
   */

  /**
   * @swagger
   * /api/movies:
   *   get:
   *     summary: Get a list of movies
   *     description: Returns a list of movies.
   *     parameters:
   *       - name: title
   *         in: query
   *         required: false
   *         description: The title of the movie to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: A successful response
   *         content:
   *           application/json:
   *             example: [{ id: 1, title: 'test title', description: 'test description' }]
   *       '500':
   *         description: A server internal error
   *
   *   post:
   *     summary: Create a new movie
   *     description: Creates a new movie.
   *     requestBody:
   *       content:
   *         application/json:
   *           example: { title: 'new title', description: 'new description' }
   *     responses:
   *       '201':
   *         description: Movie created successfully
   *         content:
   *           application/json:
   *             example: { id: 1, title: 'new title', description: 'new description' }
   *       '500':
   *         description: A server internal error
   */
  router.get("/movies", controllers.getAllMovies)
  router.post("/movies", controllers.createMovie)
  router.delete("/movies", controllers.deleteAllMovies)

  /**
   * @swagger
   * /api/movies/{id}:
   *   get:
   *     summary: Get movie by ID
   *     description: Returns a movie by ID.
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the movie to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: A successful response
   *         content:
   *           application/json:
   *             example: { id: 1, title: 'test title', description: 'test description' }
   *       '404':
   *         description: Movie not found
   *
   *   put:
   *     summary: Update movie by ID
   *     description: Updates a user by ID.
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the movie to update.
   *         schema:
   *           type: integer
   *     requestBody:
   *       content:
   *         application/json:
   *           example: { title: 'updated title' }
   *     responses:
   *       '200':
   *         description: Movie updated successfully
   *         content:
   *           application/json:
   *             example: { id: 1, title: 'updated title', description: 'test description' }
   *       '404':
   *         description: Movie not found
   *
   *   delete:
   *     summary: Delete movie by ID
   *     description: Deletes a user by ID.
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the movie to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Movie deleted successfully
   *       '404':
   *         description: Movie not found
   */
  router.get("/movies/:id", controllers.getMovieById)
  router.put("/movies/:id", controllers.updateMovieById)
  router.delete("/movies/:id", controllers.deleteMovieById)

  return router
}
