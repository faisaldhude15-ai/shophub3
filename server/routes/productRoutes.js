const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // ⚡ Automatic directory check karne ke liye add kiya

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Multer Disk Storage Engine Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products/";
    
    // ⚡ Agar folder nahi bana hua, toh yeh line khud folder bana degi
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Multi-field configuration array validation parser middleware
const uploadFields = upload.fields([
  { name: "images", maxCount: 1 },
  { name: "bestSellerImage", maxCount: 1 },
  { name: "newArrivalImage", maxCount: 1 },
  { name: "flashDealImage", maxCount: 1 }
]);

// Routing Endpoints Maps 
router.post("/", uploadFields, createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", uploadFields, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
