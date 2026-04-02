import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
    leaderboard,
    topSellers,
} from "../controllers/mainDashboard.controllers";

const router = Router();

router.get("/leaderboard", asyncHandler(leaderboard));
router.get("/top-sellers", asyncHandler(topSellers));

export default router;
