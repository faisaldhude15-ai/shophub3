const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

// POST /api/upload
router.post("/", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please select an image to upload" });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded to Cloudinary successfully",
      url: req.file.path // Secure CDN Link
    });
  });
});

module.exports = router;
