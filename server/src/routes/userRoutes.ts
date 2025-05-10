import { Router } from "express";
import { getUsers,getLoggedInUser } from "../controllers/userController";
import { isAuthenticated } from "../Middlewares/Authenticate";

const router = Router();

router.get("/", getUsers);
router.get("/me",isAuthenticated, getLoggedInUser ); // Assuming you want to get the logged-in user as well

export default router;
