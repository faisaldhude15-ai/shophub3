const mongoose = require("mongoose");

// Fallback dynamic model lookup block to prevent compilation order crashes
const getBannerModel = () => {
  if (mongoose.models.Banner) {
    return mongoose.models.Banner;
  }
  
  // Minimalist schema definition template to match your input payload structure
  const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    link: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });

  return mongoose.model("Banner", bannerSchema);
};

// =====================================
// 1. CREATE BANNER
// POST /api/admin/banners
// =====================================
const createBanner = async (req, res) => {
  try {
    const Banner = getBannerModel();
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// 2. GET ALL BANNERS
// GET /api/admin/banners
// =====================================
const getAllBanners = async (req, res) => {
  try {
    const Banner = getBannerModel();
    const banners = await Banner.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: banners.length,
      banners
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// 3. UPDATE BANNER
// PUT /api/admin/banners/:id
// =====================================
const updateBanner = async (req, res) => {
  try {
    const Banner = getBannerModel();
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// 4. DELETE BANNER
// DELETE /api/admin/banners/:id
// =====================================
const deleteBanner = async (req, res) => {
  try {
    const Banner = getBannerModel();
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner
};
