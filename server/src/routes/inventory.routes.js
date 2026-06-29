const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getInventory,
  createInventoryItem,
} = require("../controllers/inventory.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getInventory);
router.post("/:companyId", createInventoryItem);

module.exports = router;
