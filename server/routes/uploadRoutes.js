const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadImages } = require("../controllers/uploadController");

// POST /api/upload
// upload.any() accepts any fields sent through form-data safely
router.post("/", upload.any(), uploadImages);

module.exports = router;
