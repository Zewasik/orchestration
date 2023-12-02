const fs = require("fs")
const dotenv = require("dotenv")

const envPaths = [".env", "../../.env"]
const pathToEnv = envPaths.find(fs.existsSync)

let em = {
  PORT: 3000,
  PROXY_TARGET: "http://localhost:8080",
  RABBITMQ_QUEUE_NAME: "billing_queue",
  BILLING_HOST: "localhost",
}

if (pathToEnv) {
  dotenv.config({ path: pathToEnv })

  em.PORT = process.env.API_GATEWAY_PORT
  if (process.env.INVENTORY_HOST && process.env.INVENTORY_APP_PORT) {
    em.PROXY_TARGET = `http://${process.env.INVENTORY_HOST}:${process.env.INVENTORY_APP_PORT}`
  }
  if (process.env.BILLING_HOST) {
    em.BILLING_HOST = process.env.BILLING_HOST
  }
}

module.exports = Object.freeze(em)
