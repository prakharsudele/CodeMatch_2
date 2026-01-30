import axios from "axios";
import User from "../models/User.js";

export const syncGithub = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user.github?.accessToken) {
      return res.status(400).json({ message: "GitHub not connected" });
    }

    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${user.github.accessToken}`,
      },
    });

    user.github.publicRepos = data.public_repos;
    user.github.followers = data.followers;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("GitHub sync error", err);
    res.status(500).json({ message: "GitHub sync failed" });
  }
};
