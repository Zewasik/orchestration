const fs = require('fs')
const dotenv = require('dotenv')

const envPaths = ['.env', '../../.env']
const pathToEnv = envPaths.find(fs.existsSync)

let em = {
    RABBITMQ_QUEUE_NAME: 'queue',
    RABBITMQ_HOST_ADDRESS: 'localhost',
    DATABASE_USER: 'user',
    DATABASE_PASSWORD: 'secret',
    DATABASE_NAME: 'db_name',
    DATABASE_HOST: "localhost",
    DATABASE_PORT: 5432,
}


if (pathToEnv) {
    dotenv.config({ path: pathToEnv })

    em.RABBITMQ_QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME
    em.RABBITMQ_HOST_ADDRESS = process.env.RABBITMQ_HOST_ADDRESS

    em.DATABASE_USER = process.env.BILLING_PG_USER
    em.DATABASE_PASSWORD = process.env.BILLING_DB_PASSWORD
    em.DATABASE_NAME = process.env.BILLING_DB_NAME
    em.DATABASE_HOST = process.env.DATABASE_HOST
    em.DATABASE_PORT = process.env.DATABASE_PORT
}

module.exports = Object.freeze(em)