import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username avatar github leetcode linkedin"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getUserProfile error:", err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
