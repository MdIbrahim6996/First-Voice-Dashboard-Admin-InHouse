import { Router } from "express";
import {
    createLead,
    deleteLead,
    getAllLead,
    getAllLeadOfUser,
    getLeadOfUserByDate,
    updateLead,
} from "../../controllers/lead.controller";

const router = Router();


//LEADS
router.get("/lead", getAllLead);
router.post("/lead", createLead);
router.get("/lead", getAllLead);
// router.get("/lead/:userId", getAllLeadOfUser);
router.get("/lead/date/:userId", getLeadOfUserByDate);
router.put("/lead/:id", updateLead);
router.delete("/lead/:id", deleteLead);

export default router;
