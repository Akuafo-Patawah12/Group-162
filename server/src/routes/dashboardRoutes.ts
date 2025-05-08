import { Router } from "express";
import { getDashboardMetrics,getReport } from "../controllers/dashboardController";

const router = Router();

router.get("/", getDashboardMetrics);
router.get("/report",getReport)

export default router;
