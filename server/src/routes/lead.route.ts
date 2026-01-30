import { Router } from "express";
import {
    createLead,
    deleteLead,
    getAllLead,
    getAllLeadOfUser,
    getAllOldLead,
    getAllOldLeadForms,
    getLeadOfUserByDate,
    getSingleLead,
    updateLead,
} from "../controllers/lead.controller";

const router = Router();

router.post("/", createLead);
router.get("/", getAllLead);
router.get("/old", getAllOldLead);
router.get("/old-leadforms", getAllOldLeadForms);
router.get("/:userId", getAllLeadOfUser);
router.get("/date/:userId", getLeadOfUserByDate);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
