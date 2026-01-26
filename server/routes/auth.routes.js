import express from "express";
import passport from "passport";
import { githubCallback } from "../controllers/auth.controller.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  githubCallback
);

export default router;
