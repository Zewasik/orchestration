require('dotenv').config({ path: '../../.env' })

const PORT = process.env.API_GATEWAY_PORT
const PROXY_TARGET = process.env.PROXY_TARGET

module.exports = Object.freeze({
    PORT,
    PROXY_TARGET
})