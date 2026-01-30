import axios from "axios";
import User from "../models/User.js";

export const syncGithub = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user.github?.username) {
      return res.status(200).json({ message: "GitHub not connected" });
    }

    const response = await fetch(
      `https://api.github.com/users/${user.github.username}`
    );

    if (!response.ok) {
      return res.status(200).json({ message: "GitHub sync skipped" });
    }

    const data = await response.json();

    user.github.publicRepos = data.public_repos;
    user.github.followers = data.followers;
    user.github.avatar = data.avatar_url;

    await user.save();

    res.json(user.github);
  } catch (err) {
    console.error("GitHub sync error:", err);
    res.status(500).json({ message: "GitHub sync failed" });
  }
};
