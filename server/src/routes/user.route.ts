import { Router } from "express";

import {
    createUser,
    deleteUser,
    getAllCloser,
    getAllOldUser,
    getAllUser,
    getUserInfo,
    getUserYearlyAttendance,
    getUserYearlyLeads,
    getUserYearlyLeadsClosed,
    getUserYearlyLeadsVerified,
    updateUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUser);
router.get("/closer", getAllCloser);
router.get("/old", getAllOldUser);
router.get("/:id", getUserInfo);
router.get("/:id/yearly-attendance", getUserYearlyAttendance);
router.get("/:id/yearly-leads", getUserYearlyLeads);
router.get("/:id/yearly-leads/closed", getUserYearlyLeadsClosed);
router.get("/:id/yearly-leads/verified", getUserYearlyLeadsVerified);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
