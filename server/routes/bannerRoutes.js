const express = require("express");
const router = express.Router();

// Import the full object directly to stop destructuring failures
const bannerController = require("../controllers/bannerController");

// Import security middlewares
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Safeguard function to catch missing functions cleanly instead of crashing Express
const runSafe = (methodName) => {
  return (req, res, next) => {
    if (bannerController && typeof bannerController[methodName] === "function") {
      return bannerController[methodName](req, res, next);
    }
    return res.status(501).json({
      success: false,
      message: `The controller method '${methodName}' is missing or not exported correctly inside bannerController.js`
    });
  };
};

// Protect all routes inside this module
router.use(authMiddleware);
router.use(adminMiddleware);

// Base Actions mapped with fallback security wrappers
router.post("/", runSafe("createBanner"));     // POST /api/admin/banners
router.get("/", runSafe("getAllBanners"));     // GET /api/admin/banners
router.put("/:id", runSafe("updateBanner"));   // PUT /api/admin/banners/:id
router.delete("/:id", runSafe("deleteBanner")); // DELETE /api/admin/banners/:id

module.exports = router;
