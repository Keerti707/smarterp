const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  getAccountingSummary,
} = require("../controllers/accounting.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getAccountingSummary);

module.exports = router;
