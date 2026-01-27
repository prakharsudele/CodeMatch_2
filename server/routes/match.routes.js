import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getMatchRequests,
  respondToMatchRequest,
} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/requests", authMiddleware, getMatchRequests);
router.post("/respond", authMiddleware, respondToMatchRequest);

export default router;
