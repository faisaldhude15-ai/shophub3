const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const cartController = require("../controllers/cartController");


router.post(
  "/",
  authMiddleware,
  cartController.addToCart
);


router.get(
  "/",
  authMiddleware,
  cartController.getCart
);


router.put(
  "/:itemId",
  authMiddleware,
  cartController.updateQuantity
);


router.delete(
  "/:itemId",
  authMiddleware,
  cartController.removeItem
);


router.delete(
  "/",
  authMiddleware,
  cartController.clearCart
);


module.exports = router;