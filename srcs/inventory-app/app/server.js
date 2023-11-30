const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes")
const controllers = require("./controllers/movies")
const app = express()

const port = 8080

app.use(cors(), express.json())
app.use("/api", routes(controllers))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
