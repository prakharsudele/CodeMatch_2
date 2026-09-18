import User from "../models/User.js";
import { notifyUser } from "../utils/notify.js";

/* =========================
   GET SWIPE FEED
========================= */
export const getSwipeFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const excludedUsers = [
      req.userId,
      ...currentUser.swipes.liked,
      ...currentUser.swipes.passed,
      ...currentUser.matches,
    ];

    const users = await User.aggregate([
      {
        $match: {
          _id: { $nin: excludedUsers },
          github: { $ne: null },
          leetcode: { $ne: null },
          avatar: { $ne: null },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 30 },
      { $sample: { size: 10 } },
      {
        $project: {
          username: 1,
          avatar: 1,
          github: 1,
          leetcode: 1,
          linkedin: 1,
          bio: 1,
        },
      },
    ]);

    res.json(users);
  } catch (err) {
    console.error("getSwipeFeed error:", err);
    res.status(500).json({
      message: "Failed to fetch swipe feed",
    });
  }
};

/* =========================
   SWIPE ACTION
========================= */
export const swipeAction = async (req, res) => {
  const { targetUserId, action } = req.body;

  if (!["like", "pass"].includes(action)) {
    return res.status(400).json({
      message: "Invalid swipe action",
    });
  }

  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(targetUserId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!targetUser) {
      return res.status(404).json({
        message: "Target user not found",
      });
    }

    // Prevent self-swiping
    if (targetUser._id.toString() === user._id.toString()) {
      return res.status(400).json({
        message: "You cannot swipe on yourself",
      });
    }

    // ---------- PASS ----------
    if (action === "pass") {
      if (!user.swipes.passed.includes(targetUserId)) {
        user.swipes.passed.push(targetUserId);
      }

      await user.save();

      return res.json({
        status: "passed",
      });
    }

    // ---------- LIKE ----------
    if (action === "like") {
      if (!user.swipes.liked.includes(targetUserId)) {
        user.swipes.liked.push(targetUserId);
      }

      const alreadyRequested = targetUser.matchRequests.some(
        (r) => r.from.toString() === req.userId
      );

      if (!alreadyRequested) {
        targetUser.matchRequests.push({
          from: req.userId,
          status: "pending",
        });
      }

      await notifyUser({
        toUserId: targetUser._id,
        fromUserId: req.userId,
        type: "match_request",
      });

      await user.save();
      await targetUser.save();

      return res.json({
        status: "request-sent",
      });
    }
  } catch (err) {
    console.error("swipeAction error:", err);

    res.status(500).json({
      message: "Swipe failed",
    });
  }
};
