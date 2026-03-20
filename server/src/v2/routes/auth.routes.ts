import { Router } from "express";
import { login, logout } from "../controllers/auth.controllers";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// router.post("/register");
router.post("/login", asyncHandler(login));
router.get("/logout", asyncHandler(logout));

export default router;
