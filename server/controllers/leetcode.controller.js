import User from "../models/User.js";
import { getLeetcodeStats } from "../services/leetcode.service.js";

export const syncLeetcode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Username comes from DB for resync,
    // or request body for first-time connection.
    const username =
      user.leetcode?.username || req.body.username?.trim();

    if (!username) {
      return res.status(400).json({
        message: "LeetCode username required",
      });
    }

    const stats = await getLeetcodeStats(username);

    if (!stats) {
      return res.status(404).json({
        message: "LeetCode user not found",
      });
    }

    user.leetcode = {
      ...stats,
      lastSynced: new Date(),
    };

    await user.save();

    res.json(user.leetcode);
  } catch (err) {
    console.error("❌ LeetCode sync error:", err.message);

    if (err.response) {
      console.error("LeetCode response:", err.response.data);
    }

    res.status(500).json({
      message: "Failed to sync LeetCode data",
    });
  }
};