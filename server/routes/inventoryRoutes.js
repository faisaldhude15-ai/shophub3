const express = require("express");
const router = express.Router();
const { 
  getInventoryStock, 
  getLowStockAlerts, 
  updateStock 
} = require("../controllers/inventoryController");

// 1. Static routes top par taake conflict na aye
router.get("/low-stock", getLowStockAlerts);

// 2. Base route list fetch
router.get("/", getInventoryStock);

// 3. Dynamic routes end par
router.put("/:productId", updateStock);

module.exports = router;
