import { Router } from "express";
import adminRoutes from "./admin";
import superadminRoutes from "./superadmin";
import leadRoutes from "./lead.route";
import planRoutes from "./plan.route";
import processRoutes from "./process.route";
import userRoutes from "./user.route";
import statusRoutes from "./status.route";
import applianceRoutes from "./appliance.route";
import teamRoutes from "./team.route";

import {
    loginController,
    logoutController,
} from "../controllers/auth.controller";
import { getUserDetails } from "../controllers/common.controller";
import { isAuth } from "../middlewares/authMiddleware";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/superadmin", superadminRoutes);

//
// router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);
//
router.use("/lead", isAuth, leadRoutes);
router.use("/plan", planRoutes);
router.use("/process", processRoutes);
router.use("/status", statusRoutes);
router.use("/user", userRoutes);
router.use("/appliance", applianceRoutes);
router.use("/team", teamRoutes);
router.get("/common/user-detail", isAuth, getUserDetails);

export default router;
