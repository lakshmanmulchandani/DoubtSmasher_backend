import {Router} from "express"
import {createChatRoom,getChatrooms,joinChatRoom} from '../controllers/chatroom'

const router = new Router()

router.post('createchatroom',createChatRoom)
router.post('joinchatroom',joinChatRoom)
router.post('getchatrooms',getChatrooms)


export default router;