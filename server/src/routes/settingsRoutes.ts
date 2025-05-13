import  express from "express";
import { getUserSettings,updateUserSetting } from "../controllers/settingsController";
import {isAuthenticated} from "../Middlewares/Authenticate";

const router = express.Router();


router.get("/",isAuthenticated, getUserSettings)
router.patch("/:label", isAuthenticated, (req, res, next) => {
  console.log("PATCH /settings/:label hit with", req.params.label);
  next();
}, updateUserSetting);




export default router;
