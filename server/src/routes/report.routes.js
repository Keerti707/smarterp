const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { getReports } = require("../controllers/report.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getReports);

module.exports = router;