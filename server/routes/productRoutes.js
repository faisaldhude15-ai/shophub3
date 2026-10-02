const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ======================================================
// UPLOAD DIRECTORY
// ======================================================

const uploadDir = path.join(process.cwd(), "uploads", "products");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================================================
// MULTER STORAGE
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename =
      `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      extension;

    cb(null, filename);
  },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;

  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
      )
    );
  }
};

// ======================================================
// MULTER
// ======================================================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ======================================================
// PRODUCT IMAGE FIELDS
// ======================================================

const uploadFields = upload.fields([
  {
    name: "images",
    maxCount: 1,
  },
  {
    name: "bestSellerImage",
    maxCount: 1,
  },
  {
    name: "newArrivalImage",
    maxCount: 1,
  },
  {
    name: "flashDealImage",
    maxCount: 1,
  },
]);

// ======================================================
// CREATE PRODUCT
// ======================================================

router.post("/", uploadFields, createProduct);

// ======================================================
// GET ALL PRODUCTS
// ======================================================

router.get("/", getProducts);

// ======================================================
// GET SINGLE PRODUCT
// ======================================================

router.get("/:id", getSingleProduct);

// ======================================================
// UPDATE PRODUCT
// ======================================================

router.put("/:id", uploadFields, updateProduct);

// ======================================================
// DELETE PRODUCT
// ======================================================

router.delete("/:id", deleteProduct);

module.exports = router;