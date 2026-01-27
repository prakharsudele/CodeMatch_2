import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const users = [
  {
    username: "alice_dev",
    avatar: "https://i.pravatar.cc/150?img=1",
    github: {
      publicRepos: 12,
      followers: 34,
    },
    leetcode: {
      username: "aliceLC",
      name: "Alice",
      easy: 120,
      medium: 80,
      hard: 10,
      totalSolved: 210,
    },
  },
  {
    username: "bob_codes",
    avatar: "https://i.pravatar.cc/150?img=2",
    github: {
      publicRepos: 8,
      followers: 19,
    },
    leetcode: {
      username: "bobLC",
      name: "Bob",
      easy: 90,
      medium: 40,
      hard: 5,
      totalSolved: 135,
    },
  },
  {
    username: "charlie_js",
    avatar: "https://i.pravatar.cc/150?img=3",
    github: {
      publicRepos: 22,
      followers: 120,
    },
    leetcode: {
      username: "charlieLC",
      name: "Charlie",
      easy: 200,
      medium: 150,
      hard: 30,
      totalSolved: 380,
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
