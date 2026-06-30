const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getCustomers);
router.post("/:companyId", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;