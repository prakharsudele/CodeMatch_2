import jwt from "jsonwebtoken";

export const githubCallback = (req, res) => {
  console.log("CLIENT_URL =", process.env.CLIENT_URL);
  const token = jwt.sign(
    { id: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(
    `${process.env.CLIENT_URL}/auth/success?token=${token}`
  );
};
