import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { syncGithub } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncGithub);

export default router;
