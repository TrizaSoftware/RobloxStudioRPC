import express, { Request, Response } from "express"
import cors from "cors"
import { statusFormatter } from "./utils/statusFormatter"
import config from "../../config.json"
import { Client } from "@xhayper/discord-rpc"
import { Server } from "socket.io"
import { createServer } from "http"
import APIRouter from "./api"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
const discordRPCClient = new Client({clientId: config.discordApplicationId})

const corsOptions = {
  origin: '*', 
  credentials: true,          
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

// HANDLE SOCKET.IO

io.on("connection", (socket) => {
  console.log(`Socket Connected With ID ${socket.id}`)
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected`)
  })
})

// HANDLE WEB

app.use("/api", APIRouter)

app.use("/", (request: Request, response: Response) => {
    if (request.url == "/"){
      response.status(200).json(statusFormatter(true, 200, "Server Running", config.info))
    }else{
      response.status(404).json(statusFormatter(false, 404, "This Resource Doesn't Exist"))
    }
})

// HANDLE DISCORD RPC

discordRPCClient.on("ready", () => {
  discordRPCClient.user?.setActivity({
    state: "Testing 123"
  })
  console.log(`Logged In As ${discordRPCClient.user?.username}#${discordRPCClient.user?.discriminator}`)
})

discordRPCClient.login().catch((reason) => {
  console.log(`Failed To Login With Error ${reason}`)
})

// HANDLE SERVER

const server = httpServer.listen(config.port)

export {
  app as ExpressApp,
  server as WebServer
}