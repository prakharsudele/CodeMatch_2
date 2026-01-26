import jwt from "jsonwebtoken";

export const githubCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(
    `http://localhost:5173/auth/success?token=${token}`
  );
};
