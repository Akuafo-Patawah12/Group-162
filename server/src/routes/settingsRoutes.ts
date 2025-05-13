import  express from "express";
import { getUserSettings } from "../controllers/settingsController";
import {isAuthenticated} from "../Middlewares/Authenticate";

const router = express.Router();


router.get("/",isAuthenticated, getUserSettings)


export default router;
