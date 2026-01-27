import User from "../models/User.js";

export const getMatchRequests = async (req, res) => {
  const user = await User.findById(req.userId).populate(
    "matchRequests.from",
    "username avatar github leetcode"
  );

  const pending = user.matchRequests.filter(
    (r) => r.status === "pending"
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
    (r) => r.from.toString() === fromUserId
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
  }

  await user.save();
  await fromUser.save();

  res.json({ status: action });
};
