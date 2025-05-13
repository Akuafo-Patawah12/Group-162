import express from "express"
import { login, signUp, logout, forgetPassaword } from "../controllers/authController";

const router = express.Router()


router.post("/login", login)
router.post("/signup", signUp)
router.get("/logout",logout)
router.post("/forgetPassword", forgetPassaword) 


export default router