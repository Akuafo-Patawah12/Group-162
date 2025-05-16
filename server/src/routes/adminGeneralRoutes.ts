import express from "express"
import {getAllOrders,getUnreadNotifications} from "../controllers/adminGeneralRoutes"
import { isAuthenticated } from '../Middlewares/Authenticate';



const router = express.Router()


router.get("/getAllOrders",isAuthenticated,getAllOrders)
router.get('/notifications/unread',isAuthenticated, getUnreadNotifications);


export default router