import {Router} from "express"
import { createProfile } from "../controllers/interest.js";
const router = Router()

router.post('/', createProfile)


export default router;
