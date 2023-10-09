import {Router} from "express"
import { createTopic, getTopics } from "../controllers/topic.js";
const router = Router()

router.post('/createtopic',createTopic)
router.post('/gettopics',getTopics)


export default router;
