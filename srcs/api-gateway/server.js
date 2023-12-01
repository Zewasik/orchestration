const express = require("express")
const cors = require("cors")
const { apiProxy } = require("./proxy")
const app = express()

const port = 3000

app.use(cors(), apiProxy)

app.listen(port, () => {
  console.log(`InventoryAPI app is running on port ${port}`)
})
