import User from "../models/User.js";

export const getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-__v");
  res.json(user);
};
