import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { connectLeetcode } from "../controllers/leetcode.controller.js";

const router = express.Router();

router.post("/connect", authMiddleware, connectLeetcode);

export default router;
