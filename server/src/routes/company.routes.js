const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");

const router = express.Router();

router.use(protect);

router.post("/", createCompany);
router.get("/", getCompanies);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;