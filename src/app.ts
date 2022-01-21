import express from "express"
import cookieParser from 'cookie-parser'
import "./database"
import routes from "./routes"
import cors from 'cors'

import { server } from "./config"

const app = express()
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
// app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(routes)

app.listen(3333, () => {
    console.log("Now running on Port 3333")
})

