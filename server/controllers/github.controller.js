import User from "../models/User.js";

export const syncGithub = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("+githubToken");

    if (!user.githubToken) {
      return res.status(400).json({
        message: "GitHub not connected via OAuth",
      });
    }

    const ghRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${user.githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await ghRes.json();

    user.github = {
      username: data.login,
      publicRepos: data.public_repos,
      followers: data.followers,
      avatar: data.avatar_url,
      profileUrl: data.html_url,
      lastSyncedAt: new Date(),
    };

    await user.save();
    res.json(user.github);
  } catch (err) {
    console.error("GitHub sync error:", err);
    res.status(500).json({ message: "GitHub sync failed" });
  }
};


