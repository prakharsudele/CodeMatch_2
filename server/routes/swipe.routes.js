import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSwipeFeed, swipeAction } from "../controllers/swipe.controller.js";

const router = express.Router();

router.get("/feed", authMiddleware, getSwipeFeed);
router.post("/", authMiddleware, swipeAction);

export default router;
