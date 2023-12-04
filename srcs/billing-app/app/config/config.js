let em = {
  RABBITMQ_QUEUE_NAME: process.env.RABBITMQ_QUEUE_NAME || "queue",
  RABBITMQ_HOST_ADDRESS: process.env.RABBITMQ_HOST_ADDRESS || "localhost",
  DATABASE_USER: process.env.BILLING_DB_USER || "user",
  DATABASE_PASSWORD: process.env.BILLING_DB_PASSWORD || "secret",
  DATABASE_NAME: process.env.BILLING_DB_NAME || "db_name",
  DATABASE_HOST: process.env.BILLING_DB_HOST || "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
}

module.exports = Object.freeze(em)
