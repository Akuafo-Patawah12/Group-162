import express from 'express';
import getCustomerOrder,{createSale} from '../controllers/customerController';
import { isAuthenticated } from '../Middlewares/Authenticate';
const router = express.Router()


router.post("/place-order",isAuthenticated, getCustomerOrder)
router.post("/create_order",isAuthenticated,createSale)