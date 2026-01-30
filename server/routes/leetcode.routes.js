import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { syncLeetcode , connectLeetcode } from "../controllers/leetcode.controller.js";

const router = express.Router();

router.post("/connect", authMiddleware, connectLeetcode);
router.post("/sync", authMiddleware, syncLeetcode);

export default router;
