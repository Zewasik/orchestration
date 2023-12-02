const { PORT } = require('./config/config')
const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes")
const controllers = require("./controllers/movies")
const app = express()

app.use(cors(), express.json())
app.use("/api", routes(controllers))

app.listen(PORT, () => {
  console.log(`InventoryAPI app is running on port ${PORT}`)
})
