const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ===== ADMIN ===== */

    if (decoded.role === "admin") {
      req.user = {
        id: decoded.id || null,
        role: "admin",
        email: decoded.email,
      };

      return next();
    }

    /* ===== NORMAL USER ===== */

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id, // always use id
      username: user.username,
      email: user.email,
      role: "user",
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
