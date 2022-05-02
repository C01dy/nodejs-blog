import express from "express"
import cors from "cors"
import router from "./src/routes"
import { config } from "dotenv"
config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(router)

app.listen(process.env.SERVER_PORT || 3000, (err) => {

  if (err) {
    throw new Error(err)
  } else {
    console.log(`Server is running on ${process.env.PORT || 3000}`)
  }
})
