const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "", trim: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  category: { type: String, required: true },
  brand: { type: String, default: "" },
  
  images: [String],

  // =========================================================
  // 🆕 DYNAMIC SECTIONS IMAGES & BOOTSTRAP PLACEMENT FLAGS
  // =========================================================
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashDeal: { type: Boolean, default: false },
  bestSellerImage: { type: String, default: "" },
  newArrivalImage: { type: String, default: "" },
  flashDealImage: { type: String, default: "" },
  // =========================================================

  colors: [String],
  sizes: [String],
  features: [String],
  warranty: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
  sku: { type: String, unique: true, sparse: true },
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
