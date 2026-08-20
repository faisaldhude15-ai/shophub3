const express = require("express");
const router = express.Router();
const Address = require("../models/Address"); // ⚡ Core DB address structural model linked cleanly

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); 

// ==========================================
// 1. PUBLIC CHECKOUT DATA-SYNC ENDPOINTS
// ==========================================

// @desc    Permanently sync and save checkout shipping data to MongoDB
// @route   POST /api/orders/save-address
router.post("/save-address", async (req, res, next) => {
  try {
    const { fullName, email, phone, address, city, postalCode } = req.body;

    const newAddress = new Address({
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
    });

    const savedAddress = await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Shipping data saved permanently into the system data core!",
      savedAddress,
    });
  } catch (error) {
    next(error); 
  }
});

// ==========================================
// 2. ADMIN MANIFEST FETCH ENDPOINTS (FIXED DESIGN POSITION)
// ==========================================

// @desc    Retrieve all saved checkout shipping address logs for management
// @route   GET /api/orders/admin/addresses
// @access  Public / Internal Admin Panel Sync Tool
router.get("/admin/addresses", async (req, res, next) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. SECURED USER & PROTECTED BULK ADMIN LINKS
// ==========================================

// Create Order
router.post(
    "/",
    authMiddleware,
    createOrder
);

// Get Authenticated User's Orders (Explicit string route placed above dynamic ID)
router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);

// Get All Orders (Admin)
router.get(
    "/admin/all",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);

// Update Order Status (Admin Check Secured)
router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware, 
    updateOrderStatus
);

// ==========================================
// 4. DYNAMIC SLUG PARAMETERS (MUST BE AT THE ABSOLUTE BOTTOM)
// ==========================================

// ⚡ CRITICAL FIX: Moved to the very bottom so it never intercepts explicit text paths again [2]
router.get(
    "/:id",
    authMiddleware,
    getOrderById
);

module.exports = router;
