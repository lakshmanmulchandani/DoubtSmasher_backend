import express from "express"
import {createChatRoom,getChatrooms,getRecommendations,joinChatRoom} from '../controllers/chatroom.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/createchatroom',auth,createChatRoom)
router.post('/joinchatroom',auth,joinChatRoom)
router.get('/getchatrooms',auth,getChatrooms)
router.get('/getrecommendations',auth,getRecommendations)


export default router;