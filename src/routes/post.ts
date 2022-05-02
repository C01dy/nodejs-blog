import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { getManyPosts, getOnePost } from "../controllers/post"
import { config } from "dotenv"
config()

const router = Router()

router.use(expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"]
}))
router.get("/", getManyPosts)
router.get("/:id", getOnePost)

export default router;
