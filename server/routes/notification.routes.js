import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getNotifications,
  markAllRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.patch("/read", authMiddleware, markAllRead);

export default router;
