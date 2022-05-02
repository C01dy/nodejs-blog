import { createUser } from "../controllers/user"
import { auth, refreshToken } from "../controllers/auth"
import { Router } from 'express'
const router = Router()

router.post("/refresh", refreshToken)
router.post("/sign_up", createUser)
router.post("/login", auth)

export default router;
