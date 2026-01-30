import User from "../models/User.js";
import axios from "axios";

export const syncLeetcode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.leetcode?.username) {
      return res.status(400).json({ message: "LeetCode not connected" });
    }

    const { data } = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${user.leetcode.username}`
    );

    user.leetcode = {
      ...user.leetcode,
      totalSolved: data.totalSolved,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
    };

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("LeetCode sync error", err);
    res.status(500).json({ message: "LeetCode sync failed" });
  }
};
