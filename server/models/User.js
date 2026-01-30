import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: String,
    username: String,
    avatar: String,
    email: String,

    github: {
      username: String,
      publicRepos: Number,
      followers: Number,
      avatar: String,
      profileUrl: String,
      lastSyncedAt: Date,
    },
    githubToken: {
      type: String,
      select: false, // 🔐 security
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
      default: "",
    },
    swipes: {
      liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      passed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    notifications: [
      {
        type: {
          type: String,
          enum: ["match_request", "match_accepted"],
          required: true,
        },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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
