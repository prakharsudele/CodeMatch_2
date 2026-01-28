import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);

  // ✅ Allow CORS preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("✅ JWT verified:", decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("❌ JWT verify failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;