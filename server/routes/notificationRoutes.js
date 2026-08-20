const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Middlewares
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Controllers
const {
  sendSystemNotification,
  getSystemNotifications,
  getAdminMessages,
  replyToMessage
} = require("../controllers/notificationController");

// Apply Global protection layers to all admin endpoints inside this file
router.use(authMiddleware);
router.use(adminMiddleware);

// =====================================
// Notification Operations
// =====================================
router.post("/notifications", sendSystemNotification); // POST /api/admin/notifications
router.get("/notifications", getSystemNotifications);   // GET /api/admin/notifications

// =====================================
// Message/Contact Inquiry Operations
// =====================================
router.get("/messages", getAdminMessages);             // GET /api/admin/messages
router.post("/messages/:id/reply", replyToMessage);    // POST /api/admin/messages/:id/reply

// =====================================
// 🚨 SEEDER ROUTE (Self-Compiling Blueprint to avoid Mongoose Missing Schema Crash)
// =====================================
router.post("/messages/seed-test", async (req, res) => {
  try {
    // 1. Define Message Schema inline to guarantee compilation state registry
    const messageSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      subject: { type: String, default: "General Inquiry" },
      message: { type: String, required: true },
      isReplied: { type: Boolean, default: false },
      replyText: { type: String, default: "" }
    }, { timestamps: true });

    // 2. Fetch or initialize the Model context mapping
    const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

    // 3. Create document using incoming payload parameters
    const newFakeMessage = await Message.create({
      name: req.body.name || "Zain Ahmed",
      email: req.body.email || "zainahmed@gmail.com",
      subject: req.body.subject || "Refund Status Inquiry",
      message: req.body.message || "I cancelled my order yesterday. When will I receive my cash refund?"
    });

    res.status(201).json({
      success: true,
      message: "Customer message injected into MongoDB successfully!",
      data: newFakeMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
