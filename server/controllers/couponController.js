const Coupon = require("../models/Coupon");

// =====================================
// Get All Coupons
// GET /api/coupons
// =====================================
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: coupons.length,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
      error: error.message,
    });
  }
};

// =====================================
// Create New Coupon
// POST /api/coupons
// =====================================
const createCoupon = async (req, res) => {
  try {
    const { code, discountValue, expiryDate } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const coupon = await Coupon.create({
      code: code,
      discountValue: Number(discountValue),
      expiryDate: expiryDate,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully 🎉",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create coupon",
      error: error.message,
    });
  }
};

// =====================================
// Apply Coupon Code
// POST /api/coupons/apply
// =====================================
const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    if (!code || !cartTotal) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and cart total are required",
      });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code. This coupon does not exist.",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "This coupon code has been deactivated.",
      });
    }

    const currentDate = new Date();
    if (new Date(coupon.expiryDate) < currentDate) {
      return res.status(400).json({
        success: false,
        message: "This coupon code has expired.",
      });
    }

    const discountAmount = (cartTotal * coupon.discountValue) / 100;
    const finalTotal = cartTotal - discountAmount;

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully! 🎉",
      couponCode: coupon.code,
      discountPercentage: coupon.discountValue,
      originalTotal: cartTotal,
      discountAmount: discountAmount,
      finalTotal: finalTotal,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
      error: error.message,
    });
  }
};

// Teeno functions ko safely map aur export karein
module.exports = {
  getAllCoupons,
  createCoupon,
  applyCoupon
};
