import express from "express"
import {createChatRoom,getChatrooms,joinChatRoom} from '../controllers/chatroom.js'

const router = express.Router()

router.post('/createchatroom',createChatRoom)
router.post('/joinchatroom',joinChatRoom)
router.post('/getchatrooms',getChatrooms)


export default router;