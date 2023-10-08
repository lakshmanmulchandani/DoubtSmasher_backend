import {Router} from "express"
import { getPreviousMessages, sendMessage } from "../controllers/message.js";

const router = Router()

router.get('/getpreviousmessages/:chatroomid',getPreviousMessages)
router.post('/sendmessage',sendMessage)
export default router;