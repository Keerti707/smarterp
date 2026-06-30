const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getPurchaseInvoices,
  createPurchaseInvoice,
} = require("../controllers/purchase.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getPurchaseInvoices);
router.post("/:companyId", createPurchaseInvoice);

module.exports = router;