import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be first


import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            githubId: profile.id,
            username: profile.username,
            avatar: profile.photos?.[0]?.value,
            githubToken: accessToken, // 🔥 THIS WAS MISSING
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (err) {
        console.error("GitHub Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);
