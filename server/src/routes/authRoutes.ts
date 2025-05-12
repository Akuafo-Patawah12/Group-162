import express from "express"
import { login, signUp, logout } from "../controllers/authController";

const router = express.Router()


router.post("/login", login)
router.post("/signup", signUp)
router.get("/logout",logout)

export default router