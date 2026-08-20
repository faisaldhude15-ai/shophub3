const express = require("express");

const router = express.Router();

const {
  getDashboardReport,
  getSalesReport,
} = require("../controllers/reportController");

// Dashboard Report
router.get("/dashboard", getDashboardReport);

// Sales Report
router.get("/sales", getSalesReport);

module.exports = router;