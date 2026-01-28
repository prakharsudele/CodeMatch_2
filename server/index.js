import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import "./config/passport.js";
import userRoutes from "./routes/user.routes.js";
import githubRoutes from "./routes/github.routes.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";
import swipeRoutes from "./routes/swipe.routes.js";
import matchRoutes from "./routes/match.routes.js";

connectDB();

const app = express();

app.use(cors({
  origin: [
    "https://code-match-client.vercel.app",
    "https://code-match-client-qsjpxfnm1-prakhar-sudeles-projects.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
}));

app.use(express.json());


app.use(
  session({
    secret: "codematch_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/github", githubRoutes);
app.use("/leetcode", leetcodeRoutes);
app.use("/swipe", swipeRoutes);
app.use("/matches", matchRoutes);

app.get("/", (req, res) => {
  res.send("CodeMatch API running");
});

export default app;

