import User from "../models/User.js";

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
      { $sample: { size: 10 } }, // random order
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
    res.status(500).json({ message: "Failed to fetch swipe feed" });
  }
};

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

    if (action === "pass") {
      user.swipes.passed.push(targetUserId);
      await user.save();
      return res.json({ status: "passed" });
    }

    // LIKE LOGIC
    user.swipes.liked.push(targetUserId);

    // Check mutual like
    const isMatch = targetUser.swipes.liked.includes(req.userId);

    if (isMatch) {
      user.matches.push(targetUserId);
      targetUser.matches.push(req.userId);

      await targetUser.save();
      await user.save();

      return res.json({ status: "match" });
    }

    await user.save();
    res.json({ status: "liked" });
  } catch (err) {
    res.status(500).json({ message: "Swipe failed" });
  }
};

