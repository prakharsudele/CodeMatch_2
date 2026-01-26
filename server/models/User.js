import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: String,
    username: String,
    avatar: String,
    email: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
