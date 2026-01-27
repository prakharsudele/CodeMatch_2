import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const users = [
  {
    username: "Hero_singh",
    avatar: "https://i.pravatar.cc/150?img=6",
    github: {
      publicRepos: 72,
      followers: 34,
    },
    leetcode: {
      username: "heroA",
      name: "hero singh",
      easy: 120,
      medium: 80,
      hard: 10,
      totalSolved: 210,
    },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.insertMany(users);
  console.log("✅ Fake users inserted");
  process.exit();
}

seed();
