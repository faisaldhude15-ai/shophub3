const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// ⚡ CORE FIX: Checks if the model already exists in memory before compiling a brand new collection layer
module.exports = mongoose.models.Address || mongoose.model("Address", AddressSchema);
