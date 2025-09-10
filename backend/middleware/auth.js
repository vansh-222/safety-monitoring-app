// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    // Accept "Bearer <token>" or raw token
    if (token.startsWith("Bearer ")) token = token.slice(7).trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should contain the payload we signed (id, email, name)
    req.user = decoded; // e.g. { id, email, name, iat, exp }
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
