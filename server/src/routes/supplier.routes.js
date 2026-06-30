const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getSuppliers);
router.post("/:companyId", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;