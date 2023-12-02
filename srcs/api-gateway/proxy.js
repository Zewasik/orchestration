const { PROXY_TARGET } = require('./config')
const { createProxyMiddleware } = require("http-proxy-middleware")

const apiProxy = createProxyMiddleware("/api/movies", {
  target: PROXY_TARGET,
  changeOrigin: true,
  proxyTimeout: 3000,
})

module.exports = {
  apiProxy,
}
