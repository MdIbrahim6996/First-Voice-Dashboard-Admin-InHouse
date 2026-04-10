import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { searchCompany } from "../controllers/b2bLeads.controllers";

const router = Router();

router.get("/company", asyncHandler(searchCompany));

export default router;
