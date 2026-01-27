import express from "express";
import passport from "passport";
import { githubCallback } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/github", (req, res, next) => {
  console.log("🔥 Redirecting to GitHub with callback:", 
    process.env.NODE_ENV === "production"
      ? "https://code-match-backend.vercel.app/auth/github/callback"
      : "http://localhost:5000/auth/github/callback"
  );
  next();
}, passport.authenticate("github", { scope: ["user:email"] }));


router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  githubCallback
);

export default router;
