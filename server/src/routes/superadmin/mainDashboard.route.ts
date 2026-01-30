import { Router } from "express";

import {
    getDailySales,
    getProcessLeadCount,
    getTopSellers,
} from "../../controllers/mainDashboard.controller";

const router = Router();

router.get("/top-seller", getTopSellers);
router.get("/process-lead-count", getProcessLeadCount);
router.get("/daily-sales", getDailySales);

export default router;
