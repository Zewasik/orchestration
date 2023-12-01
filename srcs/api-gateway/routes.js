const amqp = require("amqplib/callback_api")
const express = require("express")

const router = express.Router()

const queueName = "billing_queue"
let channel
amqp.connect("amqp://localhost", (err, connection) => {
  if (!err) {
    connection.createChannel(async (err, newChannel) => {
      channel = newChannel
      newChannel.assertQueue(queueName, { durable: false })
    })
  }

  router.get("/", (req, res) => {
    try {
      if (!channel) {
        return
      }
      const message = JSON.stringify(req.body)
      channel.sendToQueue(queueName, message)
    } finally {
      res.end()
    }
  })
})

module.exports = router
