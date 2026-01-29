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
    linkedin: {
      type: String,
      default:"",
    },
    swipes: {
      liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      passed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },

    matchRequests: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],

    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
