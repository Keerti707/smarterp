const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getSalesInvoices,
  createSalesInvoice,
} = require("../controllers/sales.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getSalesInvoices);

router.post("/:companyId", createSalesInvoice);

module.exports = router;