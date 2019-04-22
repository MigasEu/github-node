import express from "express";
import { ReposController } from "../controllers/repos";

const router = express.Router();
    
router.get('/:username', ReposController.getUserRepos);
router.get('/:username/:repository', ReposController.getRepo);
router.get('/:username/:repository/branches', ReposController.getRepoBranches);

export default router;