import { Router } from "express"
const router = Router()
import auth from "./auth"
import post from "./post"

router.use('/auth', auth)
router.use('/posts', post)
export default router
