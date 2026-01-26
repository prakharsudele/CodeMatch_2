import axios from "axios";
import User from "../models/User.js";

export const syncGithubStats = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch GitHub profile
    const { data } = await axios.get(
      `https://api.github.com/users/${user.username}`
    );

    // Approx commits (last 30 events)
    const events = await axios.get(
      `https://api.github.com/users/${user.username}/events/public`
    );

    const commitCount = events.data.filter(
      (e) => e.type === "PushEvent"
    ).length;

    user.github = {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      commits: commitCount,
      lastSynced: new Date(),
    };

    await user.save();

    res.json(user.github);
  } catch (err) {
    res.status(500).json({ message: "GitHub sync failed" });
  }
};
