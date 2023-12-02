require('dotenv').config({ path: '../../.env' })

const PORT = process.env.INVENTORY_APP_PORT

const DATABASE_USER = process.env.INVENTORY_PG_USER
const DATABASE_PASSWORD = process.env.INVENTORY_DB_PASSWORD
const DATABASE_NAME = process.env.INVENTORY_DB_NAME
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT

module.exports = Object.freeze({
    PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PORT
})