import express from "express"
import indexRouter from "./routes/indexRouter"
import cors from "cors"
import morgan from "morgan"

const server = express()

server.use(cors())
server.use(morgan("dev"))
server.use(express.json())
server.use(indexRouter)

export default server
