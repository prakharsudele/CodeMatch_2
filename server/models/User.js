import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: String,
    username: String,
    avatar: String,
    email: String,

    github: {
      publicRepos: Number,
      followers: Number,
      following: Number,
      commits: Number,
      lastSynced: Date,
    },
    leetcode: {
      username: String,
      name: String, // 👈 display name
      totalSolved: Number,
      easy: Number,
      medium: Number,
      hard: Number,
      lastSynced: Date,
    },
    
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
