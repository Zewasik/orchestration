const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
} = require("./config/config")

const { PORT } = require("./config/config")
const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes")
const controllers = require("./controllers/movies")
const { Client } = require("pg")

const app = express()

const config = {
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
}

const client = new Client(config)

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database")
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err.message)
    process.exit(1)
  })
  .finally(() => {
    client.end()
  })

app.use(cors(), express.json())
app.use("/api", routes(controllers))

app.listen(PORT, () => {
  console.log(`InventoryAPI app is running on port ${PORT}`)
})
