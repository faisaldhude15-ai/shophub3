const Product = require("../models/Product");

// ==========================================================================
// 1. CREATE PRODUCT (Crash Proof Setup for Dynamic Multi-Files)
// POST /api/products
// ==========================================================================
const createProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, category, brand, stock, description } = req.body;
    const files = req.files || {};

    // Baseline validation check
    if (!name || !price || !brand || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all mandatory fields marked with an asterisk (*)."
      });
    }

    // Core product display pictures pipeline array parse
    let baseImagesArray = [];
    if (files["images"] && files["images"].length > 0) {
      baseImagesArray = files["images"].map(f => `/uploads/products/${f.filename}`);
    } else if (req.body.images) {
      baseImagesArray = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    } else {
      baseImagesArray = ["/images/default.jpg"];
    }

    // Formatting product data payload to secure MongoDB schema matching standard
    const productPayload = {
      name,
      brand,
      category: category || "Mobiles",
      description: description || "",
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stock: Number(stock),
      images: baseImagesArray,
      isActive: true,

      // Parse string representation booleans directly securely
      isBestSeller: req.body.isBestSeller === "true" || req.body.isBestSeller === true,
      isNewArrival: req.body.isNewArrival === "true" || req.body.isNewArrival === true,
      isFlashDeal: req.body.isFlashDeal === "true" || req.body.isFlashDeal === true,

      // ⚡ CRASH FIX: Checks if specific key array exists safely BEFORE searching index [0] property
      bestSellerImage: files["bestSellerImage"] && files["bestSellerImage"].length > 0 ? `/uploads/products/${files["bestSellerImage"][0].filename}` : "",
      newArrivalImage: files["newArrivalImage"] && files["newArrivalImage"].length > 0 ? `/uploads/products/${files["newArrivalImage"][0].filename}` : "",
      flashDealImage: files["flashDealImage"] && files["flashDealImage"].length > 0 ? `/uploads/products/${files["flashDealImage"][0].filename}` : ""
    };

    const product = await Product.create(productPayload);

    res.status(201).json({
      success: true,
      message: "Product created successfully! 🚀",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================================================
// 2. GET ALL PRODUCTS
// GET /api/products
// ==========================================================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================================================
// 3. GET SINGLE PRODUCT
// GET /api/products/:id
// ==========================================================================
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.views = (product.views || 0) + 1;
    await product.save();

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================================================
// 4. UPDATE PRODUCT (Crash Proof Update Mapping Setup)
// PUT /api/products/:id
// ==========================================================================
const updateProduct = async (req, res) => {
  try {
    const files = req.files || {};
    let updateFields = { ...req.body };

    if (req.body.isBestSeller !== undefined) updateFields.isBestSeller = req.body.isBestSeller === "true" || req.body.isBestSeller === true;
    if (req.body.isNewArrival !== undefined) updateFields.isNewArrival = req.body.isNewArrival === "true" || req.body.isNewArrival === true;
    if (req.body.isFlashDeal !== undefined) updateFields.isFlashDeal = req.body.isFlashDeal === "true" || req.body.isFlashDeal === true;

    if (files["images"] && files["images"].length > 0) {
      updateFields.images = files["images"].map(f => `/uploads/products/${f.filename}`);
    }
    
    // ⚡ CRASH FIX: Checking existence maps safely during update executions
    if (files["bestSellerImage"] && files["bestSellerImage"].length > 0) {
      updateFields.bestSellerImage = `/uploads/products/${files["bestSellerImage"][0].filename}`;
    }
    if (files["newArrivalImage"] && files["newArrivalImage"].length > 0) {
      updateFields.newArrivalImage = `/uploads/products/${files["newArrivalImage"][0].filename}`;
    }
    if (files["flashDealImage"] && files["flashDealImage"].length > 0) {
      updateFields.flashDealImage = `/uploads/products/${files["flashDealImage"][0].filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================================================
// 5. DELETE PRODUCT
// DELETE /api/products/:id
// ==========================================================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted completely from system core records logs list!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
