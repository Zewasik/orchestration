require('dotenv').config({ path: '../../.env' })

const RABBITMQ_QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME
const RABBITMQ_HOST_ADDRESS = process.env.RABBITMQ_HOST_ADDRESS

const DATABASE_USER = process.env.BILLING_PG_USER
const DATABASE_PASSWORD = process.env.BILLING_DB_PASSWORD
const DATABASE_NAME = process.env.BILLING_DB_NAME
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT

module.exports = Object.freeze({
    RABBITMQ_QUEUE_NAME,
    RABBITMQ_HOST_ADDRESS,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PORT,
})