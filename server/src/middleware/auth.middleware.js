const pool = require("../config/db");
const { verifyToken } = require("../utils/jwt");

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = result.rows[0];

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
}

module.exports = { protect };