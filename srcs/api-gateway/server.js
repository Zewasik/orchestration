const { PORT } = require("./config")
const express = require("express")
const cors = require("cors")
const { apiProxy } = require("./proxy")
const YAML = require("yamljs")
const swaggerUi = require("swagger-ui-express")
const router = require("./routes")

const app = express()

const swaggerDocument = YAML.load("./swagger.yaml")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors(), apiProxy)
app.use("/api/billing", express.json(), router)

app.listen(PORT, () => {
  console.log(`GatewayAPI app is running on port ${PORT}`)
})
