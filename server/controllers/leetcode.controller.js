import axios from "axios";
import User from "../models/User.js";

export const connectLeetcode = async (req, res) => {
  try {
    const { username } = req.body;

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const userData = response.data.data.matchedUser;
    if (!userData) {
      return res.status(404).json({ message: "LeetCode user not found" });
    }

    const stats = userData.submitStats.acSubmissionNum;

    const formatted = {
      username: userData.username,
      name: userData.profile?.realName || userData.username,
      easy: stats.find(s => s.difficulty === "Easy").count,
      medium: stats.find(s => s.difficulty === "Medium").count,
      hard: stats.find(s => s.difficulty === "Hard").count,
      totalSolved: stats.find(s => s.difficulty === "All").count,
      lastSynced: new Date(),
    };

    const user = await User.findById(req.userId);
    user.leetcode = formatted;
    await user.save();

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch LeetCode data" });
  }
};
