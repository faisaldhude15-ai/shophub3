require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

// ==============================
// Import Routes
// ==============================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const couponRoutes = require("./routes/couponRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const reportRoutes = require("./routes/reportRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes"); // <-- Cleanly Imported Notification & Message Routes

// ==============================
// Create App & Connect Database
// ==============================
const app = express();
connectDB();

// ==============================
// Middlewares
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ==============================
// Static Folder
// ==============================
app.use("/uploads", express.static("uploads"));

// ==============================
// Home Route
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 ShopSphere API Running Successfully",
  });
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/coupons", couponRoutes);

// Base Admin Route Ecosystem
app.use("/api/admin", adminRoutes);
app.use("/api/admin/banners", bannerRoutes);
app.use("/api/admin/analytics", analyticsRoutes);
app.use("/api/admin", notificationRoutes); // <-- Cleanly Mounted Notification & Message Routes (Supports /api/admin/notifications & /api/admin/messages)

app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes); 

// ==============================
// Temporary Make Admin Route
// ==============================
app.put("/api/auth/make-admin-temp", async (req, res, next) => {
  try {
    const User = mongoose.model("User");

    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${user.email} is now an admin. Please login again.`,
      user,
    });
  } catch (error) {
    next(error);
  }
});

// ==============================
// 404 Route
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
