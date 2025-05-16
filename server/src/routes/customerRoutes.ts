import express from 'express';
import getCustomerOrder,{getUserOrder,unviewedOrders} from '../controllers/customerController';
import { isAuthenticated } from '../Middlewares/Authenticate';
const router = express.Router()


router.post("/place-order",isAuthenticated, getCustomerOrder)

router.get("/get_order",isAuthenticated,getCustomerOrder)
router.get("/getUserOrder",isAuthenticated,getUserOrder)
router.get("/unviewed-orders",isAuthenticated,unviewedOrders)

export default router 