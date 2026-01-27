import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getMatchRequests,
  respondToMatchRequest,
  getMatches
} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/requests", authMiddleware, getMatchRequests);
router.post("/respond", authMiddleware, respondToMatchRequest);
router.get("/", authMiddleware, getMatches);


export default router;
