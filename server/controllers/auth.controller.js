import jwt from "jsonwebtoken";

export const githubCallback = (req, res) => {
  if (!req.user) {
    console.error("❌ GitHub callback: req.user missing");
    return res.redirect(`${process.env.CLIENT_URL}?error=github_auth_failed`);
  }

  const token = jwt.sign(
    { id: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
};
  