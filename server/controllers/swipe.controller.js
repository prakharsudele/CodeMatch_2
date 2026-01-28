import User from "../models/User.js";

/* =========================
   GET SWIPE FEED
========================= */
export const getSwipeFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    const excludedUsers = [
      req.userId,
      ...currentUser.swipes.liked,
      ...currentUser.swipes.passed,
    ];

    const users = await User.aggregate([
      {
        $match: {
          _id: { $nin: excludedUsers },
          github: { $exists: true },
          leetcode: { $exists: true },
          avatar: { $exists: true },
        },
      },
      { $sample: { size: 10 } },
      {
        $project: {
          username: 1,
          avatar: 1,
          github: 1,
          leetcode: 1,
        },
      },
    ]);

    res.json(users);
  } catch (err) {
    console.error("getSwipeFeed error:", err);
    res.status(500).json({ message: "Failed to fetch swipe feed" });
  }
};

/* =========================
   SWIPE ACTION
========================= */
export const swipeAction = async (req, res) => {
  const { targetUserId, action } = req.body;

  if (!["like", "pass"].includes(action)) {
    return res.status(400).json({ message: "Invalid swipe action" });
  }

  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    /* ---------- PASS ---------- */
    if (action === "pass") {
      if (!user.swipes.passed.includes(targetUserId)) {
        user.swipes.passed.push(targetUserId);
      }

      await user.save();
      return res.json({ status: "passed" });
    }

    /* ---------- LIKE (REQUEST-BASED) ---------- */
    if (action === "like") {
      // store like
      if (!user.swipes.liked.includes(targetUserId)) {
        user.swipes.liked.push(targetUserId);
      }

      // create match request for target user
      const alreadyRequested = targetUser.matchRequests.some(
        (r) => r.from.toString() === req.userId
      );

      if (!alreadyRequested) {
        targetUser.matchRequests.push({
          from: req.userId,
          status: "pending",
        });
      }

      await user.save();
      await targetUser.save();

      return res.json({ status: "request-sent" });
    }
  } catch (err) {
    console.error("swipeAction error:", err);
    res.status(500).json({ message: "Swipe failed" });
  }
};
