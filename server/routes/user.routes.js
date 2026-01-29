import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe , getUserProfile , updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.get("/:id", authMiddleware, getUserProfile);

router.patch("/me", authMiddleware, updateProfile);

export default router;
