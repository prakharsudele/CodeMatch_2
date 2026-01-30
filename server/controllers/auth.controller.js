import jwt from "jsonwebtoken";

export const githubCallback = (req, res) => {
  const token = generateToken(req.user._id);

  // ✅ redirect back to frontend with token
  res.redirect(
    `${process.env.CLIENT_URL}/auth/success?token=${token}`
  );
};

