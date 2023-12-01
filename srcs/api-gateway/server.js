const express = require("express")
const cors = require("cors")
const { apiProxy } = require("./proxy")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express()

const port = 3000

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation for API",
      version: "1.0.0",
      description: "API for billing and managing with movies",
    },
  },
  apis: ["../inventory-app/app/routes/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cors(), apiProxy)

app.listen(port, () => {
  console.log(`GatewayAPI app is running on port ${port}`)
})
