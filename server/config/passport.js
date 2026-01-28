import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";

import dotenv from "dotenv";
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
      callbackURL, // ✅ FIXED
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            githubId: profile.id,
            username: profile.username,
            avatar: profile.photos?.[0]?.value,
            email: profile.emails?.[0]?.value,
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (err) {
        console.error("❌ GitHub strategy error:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;
