const express = require("express");
const router = express.Router();
const { getAllCoupons, createCoupon, applyCoupon } = require("../controllers/couponController");

router.get("/", getAllCoupons);
router.post("/", createCoupon);
router.post("/apply", applyCoupon); // <-- Yeh nayi line add karein

module.exports = router;
