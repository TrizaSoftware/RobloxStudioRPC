import express, { Request, Response } from "express"
import cors from "cors"
import { statusFormatter } from "./utils/statusFormatter"
import config from "./config.json"
import { Client } from "@xhayper/discord-rpc"

const app = express()
const discordRPCClient = new Client({clientId: config.discordApplicationId})

const corsOptions = {
  origin: '*', 
  credentials: true,          
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use("/", (request: Request, response: Response) => {
    if (request.url == "/"){
      response.status(200).json(statusFormatter(true, 200, "Server Running", config.info))
    }else{
      response.status(404).json(statusFormatter(false, 404, "This Resource Doesn't Exist"))
    }
})

discordRPCClient.on("ready", () => {
  discordRPCClient.user?.setActivity({
    state: "Testing 123"
  })
  console.log(`Logged In As ${discordRPCClient.user?.username}#${discordRPCClient.user?.discriminator}`)
})

const server = app.listen(config.port)

discordRPCClient.login().catch((reason) => {
  console.log(`Failed To Login With Error ${reason}`)
})

export {
  app as ExpressApp,
  server as ExpressServer
}