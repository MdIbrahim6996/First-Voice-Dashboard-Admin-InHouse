import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createB2BLead, searchCompany } from "../controllers/b2bLeads.controllers";

const router = Router();

router.post("/", asyncHandler(createB2BLead));
router.get("/company", asyncHandler(searchCompany));

export default router;
