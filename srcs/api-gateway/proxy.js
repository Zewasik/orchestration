const { createProxyMiddleware } = require("http-proxy-middleware")

const apiProxy = createProxyMiddleware("/api/movies", {
  target: "http://localhost:8080",
  changeOrigin: true,
  proxyTimeout: 3000,
})

module.exports = {
  apiProxy,
}
