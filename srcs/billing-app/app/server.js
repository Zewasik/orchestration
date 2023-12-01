const amqplib = require("amqplib/callback_api")
const controllers = require("./controllers/orders")
const queue = "billing_queue"

amqplib.connect("amqp://localhost", (err, conn) => {
  if (err) throw err

  conn.createChannel((err, channel) => {
    if (err) throw err

    channel.assertQueue(queue)
    channel.consume(
      queue,
      (msg) => {
        const acknowledge = () => channel.ack(msg)
        const notAcknowledge = () => channel.nack(msg, false, false)

        if (msg !== null) {
          try {
            const jsonData = JSON.parse(msg.content.toString())

            if (typeof jsonData === "object") {
              controllers.createOrder(jsonData, acknowledge, notAcknowledge)
            } else {
              throw new Error("Received message is not a JSON object.")
            }
          } catch (error) {
            console.error("Error:", error)
            notAcknowledge()
          }
        } else {
          console.log("Consumer cancelled by server")
        }
      },
      { noAck: false }
    )
  })
})
