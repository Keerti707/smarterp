const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventory.controller");

const router = express.Router();

router.use(protect);

router.get("/:companyId", getInventory);

router.post("/:companyId", createInventoryItem);

router.put("/item/:id", updateInventoryItem);

router.delete("/item/:id", deleteInventoryItem);

module.exports = router;
