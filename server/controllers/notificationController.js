const mongoose = require("mongoose");

// Dynamic Fallback Models Initialization to avoid compilation sync bugs
const getNotificationModel = () => {
  if (mongoose.models.Notification) return mongoose.models.Notification;
  const schema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "warning", "success", "alert"], default: "info" },
    target: { type: String, enum: ["all", "users", "admin"], default: "all" }
  }, { timestamps: true });
  return mongoose.model("Notification", schema);
};

const getMessageModel = () => {
  if (mongoose.models.Message) return mongoose.models.Message;
  const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    isReplied: { type: Boolean, default: false },
    replyText: { type: String, default: "" }
  }, { timestamps: true });
  return mongoose.model("Message", schema);
};

// =====================================
// Send Global System Notification
// =====================================
const sendSystemNotification = async (req, res) => {
  try {
    const Notification = getNotificationModel();
    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Broadcast notification dispatched successfully",
      notification
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// Get All Logged System Notifications
// =====================================
const getSystemNotifications = async (req, res) => {
  try {
    const Notification = getNotificationModel();
    const notifications = await Notification.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// Get All Customer Support Messages
// =====================================
const getAdminMessages = async (req, res) => {
  try {
    const Message = getMessageModel();
    const messages = await Message.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// Reply to Customer Message Inquiry
// =====================================
const replyToMessage = async (req, res) => {
  try {
    const { replyText } = req.body;
    const Message = getMessageModel();
    
    const messageItem = await Message.findByIdAndUpdate(
      req.params.id,
      { isReplied: true, replyText },
      { new: true }
    );

    if (!messageItem) {
      return res.status(404).json({ success: false, message: "Message inquiry item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Reply recorded and logged successfully",
      messageItem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendSystemNotification,
  getSystemNotifications,
  getAdminMessages,
  replyToMessage
};
