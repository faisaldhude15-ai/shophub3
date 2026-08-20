const Product = require("../models/Product");

// =====================================
// Get All Inventory Stock
// GET /api/inventory
// =====================================
const getInventoryStock = async (req, res) => {
  try {
    const products = await Product.find().select("name stock price category brand");
    res.status(200).json({
      success: true,
      count: products.length,
      inventory: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
      error: error.message
    });
  }
};

// =====================================
// Get Low Stock Products Alerts
// GET /api/inventory/low-stock
// =====================================
const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockItems = await Product.find({ stock: { $lt: 10 } })
      .select("name stock price category brand");

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      message: lowStockItems.length === 0 ? "All items have healthy stock levels! ✅" : "Low stock warnings found ⚠️",
      items: lowStockItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate stock alerts",
      error: error.message
    });
  }
};

// =====================================
// Update Product Stock
// PUT /api/inventory/:productId
// =====================================
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid stock number value"
      });
    }

    // Deprecation warning ko fix karne ke liye returnDocument use kiya hai
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { stock: Number(stock) },
      { returnDocument: 'after' } 
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock updated successfully 📦",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update stock",
      error: error.message
    });
  }
};

// Yahan keys ki spelling check karein
module.exports = {
  getInventoryStock,
  getLowStockAlerts,
  updateStock
};
