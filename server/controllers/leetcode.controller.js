import axios from "axios";
import User from "../models/User.js";

export const syncLeetcode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // ✅ username can come from DB (resync) OR body (first connect)
    const username = user.leetcode?.username || req.body.username;

    if (!username) {
      return res.status(400).json({
        message: "LeetCode username required",
      });
    }

    // 🌐 Fetch public LeetCode stats
    const { data } = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!data || data.status === "error") {
      return res.status(404).json({
        message: "LeetCode user not found",
      });
    }

    // ✅ Save / update stats
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
    console.error("LeetCode sync error:", err);
    res.status(500).json({
      message: "Failed to sync LeetCode data",
    });
  }
};
