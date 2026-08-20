const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

// =======================================
// Wishlist Routes
// =======================================

// Add Product To Wishlist
router.post("/", authMiddleware, addToWishlist);

// Get My Wishlist
router.get("/", authMiddleware, getWishlist);

// Remove Product From Wishlist
router.delete("/:productId", authMiddleware, removeWishlist);

module.exports = router;