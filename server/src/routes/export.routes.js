const express = require("express");

const { protect } = require("../middleware/auth.middleware");
const { exportSales } = require("../controllers/export.controller");

const router = express.Router();

router.get("/sales/:companyId", protect, exportSales);

module.exports = router;