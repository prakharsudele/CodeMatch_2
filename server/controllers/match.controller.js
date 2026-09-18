import User from "../models/User.js";
import { notifyUser } from "../utils/notify.js";

export const getMatchRequests = async (req, res) => {
  const user = await User.findById(req.userId).populate(
    "matchRequests.from",
    "username avatar github leetcode bio",
  );

  const pending = user.matchRequests.filter(
    (r) => r.status === "pending" && r.from,
  );

  res.json(pending);
};

export const respondToMatchRequest = async (req, res) => {
  const { fromUserId, action } = req.body;

  if (!["accept", "reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid action" });
  }

  const user = await User.findById(req.userId);
  const fromUser = await User.findById(fromUserId);

  const request = user.matchRequests.find(
    (r) => r.from.toString() === fromUserId,
  );

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = action === "accept" ? "accepted" : "rejected";

  if (action === "accept") {
    // add both users to matches
    if (!user.matches.includes(fromUserId)) {
      user.matches.push(fromUserId);
    }
    if (!fromUser.matches.includes(req.userId)) {
      fromUser.matches.push(req.userId);
    }
    await notifyUser({
      toUserId: fromUserId,
      fromUserId: req.userId,
      type: "match_accepted",
    });
  }

  await user.save();
  await fromUser.save();

  res.json({ status: action });
};

export const getMatches = async (req, res) => {
  const user = await User.findById(req.userId).populate(
    "matches",
    "username avatar github leetcode linkedin bio",
  );

  res.json(user.matches);
};

export const removeConnection = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      return res.status(400).json({
        message: "You cannot remove yourself",
      });
    }

    const user = await User.findById(currentUserId);
    const otherUser = await User.findById(otherUserId);

    if (!user || !otherUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove each user from the other's matches
    user.matches = user.matches.filter(
      (id) => id.toString() !== otherUserId
    );

    otherUser.matches = otherUser.matches.filter(
      (id) => id.toString() !== currentUserId
    );

    await user.save();
    await otherUser.save();

    res.json({
      message: "Connection removed successfully",
    });
  } catch (err) {
    console.error("removeConnection error:", err);

    res.status(500).json({
      message: "Failed to remove connection",
    });
  }
};
