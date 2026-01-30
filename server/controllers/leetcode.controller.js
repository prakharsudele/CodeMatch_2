import axios from "axios";
import User from "../models/User.js";

export const syncLeetcode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user?.leetcode?.username) {
      return res.status(400).json({
        message: "LeetCode username not connected",
      });
    }

    const { username } = user.leetcode;

    // Public LeetCode stats API
    const { data } = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!data || data.status === "error") {
      return res.status(404).json({
        message: "LeetCode user not found",
      });
    }

    user.leetcode = {
      username,
      name: data.realName || data.username || "",
      totalSolved: data.totalSolved ?? 0,
      easy: data.easySolved ?? 0,
      medium: data.mediumSolved ?? 0,
      hard: data.hardSolved ?? 0,
      lastSynced: new Date(),
    };

    await user.save();

    res.json(user.leetcode);
  } catch (err) {
    console.error("LeetCode sync error:", err.message);
    res.status(500).json({
      message: "Failed to sync LeetCode data",
    });
  }
};
