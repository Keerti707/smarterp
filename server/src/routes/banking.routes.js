const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { getBankingSummary } = require("../controllers/banking.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getBankingSummary);

module.exports = router;
