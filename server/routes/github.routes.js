import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { syncGithubStats } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncGithubStats);

export default router;
