import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { syncLeetcode  } from "../controllers/leetcode.controller.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncLeetcode);

export default router;
