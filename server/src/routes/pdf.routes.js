const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { generateInvoice } = require("../controllers/pdf.controller");

const router = express.Router();

router.get("/invoice/:invoiceId", protect, generateInvoice);

module.exports = router;