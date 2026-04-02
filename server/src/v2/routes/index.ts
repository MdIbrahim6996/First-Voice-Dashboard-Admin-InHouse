import { Router } from "express";
import authRouter from "./auth.routes";
import mainDashboardRouter from "./mainDashboard.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/main-dashboard", mainDashboardRouter);

export default router;
