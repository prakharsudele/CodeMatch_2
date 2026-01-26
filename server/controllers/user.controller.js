import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-__v");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

