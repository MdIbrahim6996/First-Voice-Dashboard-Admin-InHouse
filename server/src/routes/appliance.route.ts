import { Router } from "express";
import {
    deleteAppliance,
    getAppliancePerPage,
    getAppliances,
    updateAppliance,
} from "../controllers/appliance.controller";

const router = Router();

router.post("/appliance-per-page", getAppliancePerPage);
router.get("/:leadId", getAppliances);
router.put("/:id", updateAppliance);
router.delete("/:id", deleteAppliance);

export default router;
