const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createPaymentIntent,
} = require("../controllers/paymentController");

router.post(
  "/create-payment-intent",
  authMiddleware,
  createPaymentIntent
);

module.exports = router;