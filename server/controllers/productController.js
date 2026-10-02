const Product = require("../models/Product");

// ======================================================
// HELPER
// ======================================================

const parseBoolean = (value) => {
  if (value === true || value === "true" || value === "1") {
    return true;
  }

  return false;
};

const getUploadedImage = (files, fieldName) => {
  if (
    files &&
    files[fieldName] &&
    Array.isArray(files[fieldName]) &&
    files[fieldName].length > 0
  ) {
    return `/uploads/products/${files[fieldName][0].filename}`;
  }

  return "";
};

// ======================================================
// 1. CREATE PRODUCT
// POST /api/products
// ======================================================

const createProduct = async (req, res) => {
  try {
    console.log("\n========== CREATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("====================================\n");

    const {
      name,
      price,
      discountPrice,
      category,
      brand,
      stock,
      description,
      isBestSeller,
      isNewArrival,
      isFlashDeal,
    } = req.body;

    const files = req.files || {};

    // ==================================================
    // REQUIRED VALIDATION
    // ==================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product title is required.",
      });
    }

    if (price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Product price is required.",
      });
    }

    if (isNaN(Number(price))) {
      return res.status(400).json({
        success: false,
        message: "Product price must be a valid number.",
      });
    }

    if (!brand || !brand.trim()) {
      return res.status(400).json({
        success: false,
        message: "Brand is required.",
      });
    }

    if (stock === undefined || stock === "") {
      return res.status(400).json({
        success: false,
        message: "Stock is required.",
      });
    }

    if (isNaN(Number(stock))) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid number.",
      });
    }

    // ==================================================
    // MAIN IMAGE
    // ==================================================

    let images = [];

    const mainImage = getUploadedImage(files, "images");

    if (mainImage) {
      images.push(mainImage);
    }

    // If no image uploaded
    if (images.length === 0) {
      images.push("/images/default.jpg");
    }

    // ==================================================
    // OPTIONAL SPECIAL IMAGES
    // ==================================================

    const bestSellerImage = getUploadedImage(
      files,
      "bestSellerImage"
    );

    const newArrivalImage = getUploadedImage(
      files,
      "newArrivalImage"
    );

    const flashDealImage = getUploadedImage(
      files,
      "flashDealImage"
    );

    // ==================================================
    // PRODUCT DATA
    // ==================================================

    const productData = {
      name: name.trim(),

      brand: brand.trim(),

      category:
        category && category.trim()
          ? category.trim()
          : "General",

      description:
        description && description.trim()
          ? description.trim()
          : "",

      price: Number(price),

      stock: Number(stock),

      images,

      isActive: true,

      isBestSeller: parseBoolean(isBestSeller),

      isNewArrival: parseBoolean(isNewArrival),

      isFlashDeal: parseBoolean(isFlashDeal),
    };

    // ==================================================
    // DISCOUNT PRICE
    // ==================================================

    if (
      discountPrice !== undefined &&
      discountPrice !== "" &&
      !isNaN(Number(discountPrice))
    ) {
      productData.discountPrice = Number(discountPrice);
    }

    // ==================================================
    // SPECIAL IMAGES
    // ==================================================

    if (bestSellerImage) {
      productData.bestSellerImage = bestSellerImage;
    }

    if (newArrivalImage) {
      productData.newArrivalImage = newArrivalImage;
    }

    if (flashDealImage) {
      productData.flashDealImage = flashDealImage;
    }

    // ==================================================
    // CREATE PRODUCT
    // ==================================================

    const product = await Product.create(productData);

    console.log("PRODUCT CREATED:", product._id);

    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// 2. GET ALL PRODUCTS
// GET /api/products
// ======================================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// 3. GET SINGLE PRODUCT
// GET /api/products/:id
// ======================================================

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Increase views
    product.views = (product.views || 0) + 1;

    await product.save();

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// 4. UPDATE PRODUCT
// PUT /api/products/:id
// ======================================================

const updateProduct = async (req, res) => {
  try {
    console.log("\n========== UPDATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("====================================\n");

    const files = req.files || {};

    const updateFields = {};

    // ==================================================
    // TEXT FIELDS
    // ==================================================

    if (req.body.name !== undefined) {
      updateFields.name = req.body.name.trim();
    }

    if (req.body.brand !== undefined) {
      updateFields.brand = req.body.brand.trim();
    }

    if (req.body.category !== undefined) {
      updateFields.category = req.body.category.trim();
    }

    if (req.body.description !== undefined) {
      updateFields.description = req.body.description;
    }

    // ==================================================
    // PRICE
    // ==================================================

    if (
      req.body.price !== undefined &&
      req.body.price !== ""
    ) {
      updateFields.price = Number(req.body.price);
    }

    // ==================================================
    // DISCOUNT PRICE
    // ==================================================

    if (
      req.body.discountPrice !== undefined &&
      req.body.discountPrice !== ""
    ) {
      updateFields.discountPrice = Number(
        req.body.discountPrice
      );
    }

    // ==================================================
    // STOCK
    // ==================================================

    if (
      req.body.stock !== undefined &&
      req.body.stock !== ""
    ) {
      updateFields.stock = Number(req.body.stock);
    }

    // ==================================================
    // BOOLEAN FIELDS
    // ==================================================

    if (req.body.isBestSeller !== undefined) {
      updateFields.isBestSeller = parseBoolean(
        req.body.isBestSeller
      );
    }

    if (req.body.isNewArrival !== undefined) {
      updateFields.isNewArrival = parseBoolean(
        req.body.isNewArrival
      );
    }

    if (req.body.isFlashDeal !== undefined) {
      updateFields.isFlashDeal = parseBoolean(
        req.body.isFlashDeal
      );
    }

    // ==================================================
    // MAIN IMAGE
    // ==================================================

    const mainImage = getUploadedImage(files, "images");

    if (mainImage) {
      updateFields.images = [mainImage];
    }

    // ==================================================
    // SPECIAL IMAGES
    // ==================================================

    const bestSellerImage = getUploadedImage(
      files,
      "bestSellerImage"
    );

    if (bestSellerImage) {
      updateFields.bestSellerImage = bestSellerImage;
    }

    const newArrivalImage = getUploadedImage(
      files,
      "newArrivalImage"
    );

    if (newArrivalImage) {
      updateFields.newArrivalImage = newArrivalImage;
    }

    const flashDealImage = getUploadedImage(
      files,
      "flashDealImage"
    );

    if (flashDealImage) {
      updateFields.flashDealImage = flashDealImage;
    }

    // ==================================================
    // UPDATE
    // ==================================================

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateFields,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// 5. DELETE PRODUCT
// DELETE /api/products/:id
// ======================================================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};