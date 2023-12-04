let em = {
  PORT: process.env.API_GATEWAY_PORT || 3000,
  PROXY_TARGET: "http://localhost:8080",
  RABBITMQ_QUEUE_NAME: "billing_queue",
  RABBITMQ_HOST_ADDRESS: process.env.RABBITMQ_HOST_ADDRESS || "localhost",
}

if (process.env.INVENTORY_HOST && process.env.INVENTORY_APP_PORT) {
  em.PROXY_TARGET = `http://${process.env.INVENTORY_HOST}:${process.env.INVENTORY_APP_PORT}`
}

module.exports = Object.freeze(em)
