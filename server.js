const express = require("express")
const cors = require("cors")
const router = require("./src/routes")
const { client } = require("./src/services/db")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(router)

client
  .connect()
  .then(() => {
    app.listen(process.env.SERVER_PORT || 3000, (err) => {
      if (err) {
        throw new Error(err)
      } else {
        console.log(`Server is running on ${process.env.PORT || 3000}`)
      }
    })
  })
  .catch((error) => console.error(error))
