const fs = require('fs')
const dotenv = require('dotenv')

const envPaths = ['.env', '../../.env']
const pathToEnv = envPaths.find(fs.existsSync)

let em = {
    PORT: 3000,
    PROXY_TARGET: "http://localhost:8080"
}

if (pathToEnv) {
    dotenv.config({ path: pathToEnv })

    em.PORT = process.env.API_GATEWAY_PORT
    em.PROXY_TARGET = process.env.PROXY_TARGET
}

module.exports = Object.freeze(em)