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

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
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

app.get("/", (req, res) => {
  res.send("CodeMatch API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
