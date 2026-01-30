import User from "../models/User.js";

export const getNotifications = async (req, res) => {
  const user = await User.findById(req.userId)
    .populate("notifications.from", "username avatar")
    .select("notifications");

  res.json(user.notifications.reverse());
};

export const markAllRead = async (req, res) => {
  await User.updateOne(
    { _id: req.userId },
    { $set: { "notifications.$[].read": true } }
  );

  res.json({ success: true });
};
