const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "SmartERP backend is running" });
});

app.get("/db-health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "Database connection failed",
      message: error.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
