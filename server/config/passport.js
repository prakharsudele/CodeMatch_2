import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv"; // 1. Add this import

dotenv.config();

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://code-match-backend.vercel.app/auth/github/callback"
    : "http://localhost:5000/auth/github/callback";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { githubId: profile.id },
        {
          githubId: profile.id,
          username: profile.username,
          email: profile.emails?.[0]?.value
        },
        { upsert: true, new: true }
      );

      return done(null, user);
    }
  )
);


