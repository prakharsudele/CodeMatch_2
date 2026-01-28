import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe , getUserProfile  } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.get("/:id", authMiddleware, getUserProfile);

export default router;
