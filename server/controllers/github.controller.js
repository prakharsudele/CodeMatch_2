import axios from "axios";
import User from "../models/User.js";

export const syncGithub = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("+githubToken");

    if (!user.githubToken) {
      return res.status(400).json({
        message: "GitHub not connected via OAuth",
      });
    }

    const ghRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${user.githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await ghRes.json();

    user.github = {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      lastSynced: new Date(),
    };

    await user.save();
    res.json(user.github);
  } catch (err) {
    res.status(500).json({ message: "GitHub sync failed" });
  }
};
