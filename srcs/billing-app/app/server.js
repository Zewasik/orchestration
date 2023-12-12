const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  RABBITMQ_QUEUE_NAME,
  RABBITMQ_HOST_ADDRESS,
} = require("./config/config")
const amqplib = require("amqplib/callback_api")
const controllers = require("./controllers/orders")

const { Client } = require("pg")

const config = {
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
}

const client = new Client(config)

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database")
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err.message)
    process.exit(1)
  })
  .finally(() => {
    client.end()
  })

amqplib.connect(`amqp://${RABBITMQ_HOST_ADDRESS}`, (err, conn) => {
  if (err) throw err

  conn.createChannel((err, channel) => {
    if (err) throw err

    channel.assertQueue(RABBITMQ_QUEUE_NAME)
    channel.consume(
      RABBITMQ_QUEUE_NAME,
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
