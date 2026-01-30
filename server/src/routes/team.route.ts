import { Router } from "express";
import {
    createTeam,
    deleteTeam,
    getAllTeams,
    getSingleTeam,
    updateTeam,
} from "../controllers/team.controller";

const router = Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.get("/:id", getSingleTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
