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
      callbackURL,
    },
    
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            avatar: profile.photos[0].value,
            email: profile.emails?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
