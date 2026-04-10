import { Router } from "express";
import authRouter from "./auth.routes";
import mainDashboardRouter from "./mainDashboard.routes";
import b2bLeadsRouter from "./b2bLeads.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/main-dashboard", mainDashboardRouter);
router.use("/b2b-lead", b2bLeadsRouter);

export default router;
