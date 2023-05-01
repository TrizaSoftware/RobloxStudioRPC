import { Request, Response, Router } from "express"
import { DiscordRPCClient } from "."

const router = Router()

router.post("/set-status", (request: Request, response: Response) => {
    const {stateText} = request.body

    DiscordRPCClient.user?.setActivity({
        state: stateText
    })
})

export default router