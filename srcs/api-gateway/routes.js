const amqp = require("amqplib/callback_api")
const express = require("express")
const { RABBITMQ_QUEUE_NAME, RABBITMQ_HOST_ADDRESS } = require("./config")

const router = express.Router()

let channel
amqp.connect(`amqp://${RABBITMQ_HOST_ADDRESS}`, (err, connection) => {
  if (err) {
    throw new Error(err)
  }

  connection.createChannel((err, newChannel) => {
    channel = newChannel
    newChannel.assertQueue(RABBITMQ_QUEUE_NAME)
  })

  router.post("/", (req, res) => {
    try {
      if (!channel) {
        return
      }
      const message = JSON.stringify(req.body)
      channel.sendToQueue(RABBITMQ_QUEUE_NAME, Buffer.from(message))
    } finally {
      res.status(201)
      res.end()
    }
  })
})

module.exports = router
