const fs = require('fs')
const dotenv = require('dotenv')

const envPaths = ['.env', '../../.env']
const pathToEnv = envPaths.find(fs.existsSync)

let em = {
    PORT: 8080,
    DATABASE_USER: 'user',
    DATABASE_PASSWORD: 'secret',
    DATABASE_NAME: 'db_name',
    DATABASE_HOST: "localhost",
    DATABASE_PORT: 5432,
}

if (pathToEnv) {
    dotenv.config({ path: pathToEnv })

    em.PORT = process.env.INVENTORY_APP_PORT

    em.DATABASE_USER = process.env.INVENTORY_PG_USER
    em.DATABASE_PASSWORD = process.env.INVENTORY_DB_PASSWORD
    em.DATABASE_NAME = process.env.INVENTORY_DB_NAME
    em.DATABASE_HOST = process.env.DATABASE_HOST
    em.DATABASE_PORT = process.env.DATABASE_PORT
}

module.exports = Object.freeze(em)