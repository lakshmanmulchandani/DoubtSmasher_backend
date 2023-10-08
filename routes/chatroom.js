import express from "express"
import {createChatRoom,getChatrooms,joinChatRoom} from '../controllers/chatroom.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/createchatroom',auth,createChatRoom)
router.post('/joinchatroom',joinChatRoom)
router.get('/getchatrooms',getChatrooms)


export default router;