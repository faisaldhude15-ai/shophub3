const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

module.exports = router;