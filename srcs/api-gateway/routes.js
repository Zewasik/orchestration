const amqp = require("amqplib/callback_api")
const express = require("express")

const router = express.Router()

const queueName = "billing_queue"
let channel
amqp.connect("amqp://localhost", (err, connection) => {
  if (!err) {
    connection.createChannel(async (err, newChannel) => {
      channel = newChannel
      newChannel.assertQueue(queueName)
    })
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     Order:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: The odrer's ID.
   *         user_id:
   *           type: string
   *           description: The id of the user making the order.
   *         number_of_items:
   *           type: string
   *           description: The number of items included in the order.
   *         total_amount:
   *           type: string
   *           description: The total cost of the order.
   */
  /**
   * @swagger
   * /api/billing:
   *   post:
   *     summary: Create a new order
   *     description: Creates a new order.
   *     requestBody:
   *       content:
   *         application/json:
   *           example: { "user_id": "3", "number_of_items": "5", "total_amount": "180" }
   *     responses:
   *       '201':
   *         description: Movie created successfully
   */
  router.post("/", (req, res) => {
    try {
      if (!channel) {
        return
      }
      const message = JSON.stringify(req.body)
      channel.sendToQueue(queueName, Buffer.from(message))
    } finally {
      res.status(201)
      res.end()
    }
  })
})

module.exports = router
