import {Router} from "express"
import { createTopic } from "../controllers/topic.js";
const router = Router()

router.post('/createtopic',createTopic)


export default router;
