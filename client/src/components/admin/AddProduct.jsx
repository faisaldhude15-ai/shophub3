
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ======================================================
  // PRODUCT DATA
  // ======================================================

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "Mobiles",
    brand: "",
    stock: "",
    description: "",

    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
  });

  // ======================================================
  // IMAGE STATES
  // ======================================================

  const [mainImageFile, setMainImageFile] = useState(null);
  const [bestSellerImageFile, setBestSellerImageFile] = useState(null);
  const [newArrivalImageFile, setNewArrivalImageFile] = useState(null);
  const [flashDealImageFile, setFlashDealImageFile] = useState(null);

  // ======================================================
  // INPUT CHANGE
  // ======================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================================
  // CHECKBOX CHANGE
  // ======================================================

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setProductData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  // ======================================================
  // MAIN IMAGE
  // ======================================================

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setMainImageFile(file);
  };

  // ======================================================
  // BEST SELLER IMAGE
  // ======================================================

  const handleBestSellerImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setBestSellerImageFile(file);
  };

  // ======================================================
  // NEW ARRIVAL IMAGE
  // ======================================================

  const handleNewArrivalImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setNewArrivalImageFile(file);
  };

  // ======================================================
  // FLASH DEAL IMAGE
  // ======================================================

  const handleFlashDealImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFlashDealImageFile(file);
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (loading) {
      return;
    }

    // ====================================================
    // FRONTEND VALIDATION
    // ====================================================

    if (!productData.name.trim()) {
      alert("Please enter Product Title.");
      return;
    }

    if (!productData.price) {
      alert("Please enter Product Price.");
      return;
    }

    if (!productData.brand.trim()) {
      alert("Please enter Brand.");
      return;
    }

    if (!productData.stock) {
      alert("Please enter Stock.");
      return;
    }

    if (!mainImageFile) {
      alert("Please select the main product image.");
      return;
    }

    // ====================================================
    // START LOADING
    // ====================================================

    setLoading(true);

    try {
      // ==================================================
      // FORM DATA
      // ==================================================

      const formData = new FormData();

      // Product information
      formData.append(
        "name",
        productData.name.trim()
      );

      formData.append(
        "price",
        String(productData.price)
      );

      formData.append(
        "discountPrice",
        String(productData.discountPrice || "")
      );

      formData.append(
        "category",
        productData.category
      );

      formData.append(
        "brand",
        productData.brand.trim()
      );

      formData.append(
        "stock",
        String(productData.stock)
      );

      formData.append(
        "description",
        productData.description || ""
      );

      // ==================================================
      // BOOLEAN VALUES
      // ==================================================

      formData.append(
        "isBestSeller",
        productData.isBestSeller ? "true" : "false"
      );

      formData.append(
        "isNewArrival",
        productData.isNewArrival ? "true" : "false"
      );

      formData.append(
        "isFlashDeal",
        productData.isFlashDeal ? "true" : "false"
      );

      // ==================================================
      // MAIN IMAGE
      // IMPORTANT: backend expects "images"
      // ==================================================

      if (mainImageFile instanceof File) {
        formData.append(
          "images",
          mainImageFile
        );
      }

      // ==================================================
      // BEST SELLER IMAGE
      // ==================================================

      if (
        productData.isBestSeller &&
        bestSellerImageFile instanceof File
      ) {
        formData.append(
          "bestSellerImage",
          bestSellerImageFile
        );
      }

      // ==================================================
      // NEW ARRIVAL IMAGE
      // ==================================================

      if (
        productData.isNewArrival &&
        newArrivalImageFile instanceof File
      ) {
        formData.append(
          "newArrivalImage",
          newArrivalImageFile
        );
      }

      // ==================================================
      // FLASH DEAL IMAGE
      // ==================================================

      if (
        productData.isFlashDeal &&
        flashDealImageFile instanceof File
      ) {
        formData.append(
          "flashDealImage",
          flashDealImageFile
        );
      }

      // ==================================================
      // DEBUG
      // ==================================================

      console.log(
        "========== PRODUCT FORM DATA =========="
      );

      for (const [key, value] of formData.entries()) {
        console.log(
          key,
          value instanceof File
            ? `${value.name} (${value.type})`
            : value
        );
      }

      console.log(
        "========================================"
      );

      // ==================================================
      // API REQUEST
      // IMPORTANT:
      // DO NOT manually set Content-Type
      // ==================================================

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      console.log(
        "PRODUCT RESPONSE:",
        response.data
      );

      // ==================================================
      // SUCCESS
      // ==================================================

      if (
        response.status === 201 &&
        response.data.success
      ) {
        alert(
          "🎉 Product added successfully!"
        );

        navigate("/admin/products");
      }
    } catch (error) {
      // ==================================================
      // REAL ERROR
      // ==================================================

      console.error(
        "========== PRODUCT ERROR =========="
      );

      console.error(
        "Error:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "==================================="
      );

      const serverMessage =
        error.response?.data?.message;

      alert(
        serverMessage ||
        error.message ||
        "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div
      className="admin-add-product-layout"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <AdminSidebar />

      <div
        className="admin-add-product-content"
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          Add New Product
        </h1>

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            maxWidth: "800px",
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* PRODUCT TITLE */}

            <input
              type="text"
              name="name"
              required
              placeholder="Product Title *"
              value={productData.name}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />

            {/* PRICE */}

            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="Price *"
              value={productData.price}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />

            {/* DISCOUNT PRICE */}

            <input
              type="number"
              name="discountPrice"
              min="0"
              placeholder="Discount Price"
              value={productData.discountPrice}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />

            {/* BRAND */}

            <input
              type="text"
              name="brand"
              required
              placeholder="Brand *"
              value={productData.brand}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />

            {/* CATEGORY */}

            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#fff",
              }}
            >
              <option value="Mobiles">
                Mobiles
              </option>

              <option value="Shoes">
                Shoes
              </option>

              <option value="Clothing">
                Clothing
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Accessories">
                Accessories
              </option>

              <option value="General">
                General
              </option>
            </select>

            {/* STOCK */}

            <input
              type="number"
              name="stock"
              required
              min="0"
              placeholder="Stock *"
              value={productData.stock}
              onChange={handleInputChange}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />

            {/* CHECKBOXES */}

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
            >
              <label
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={
                    productData.isBestSeller
                  }
                  onChange={
                    handleCheckboxChange
                  }
                />{" "}
                Best Seller
              </label>

              <label
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={
                    productData.isNewArrival
                  }
                  onChange={
                    handleCheckboxChange
                  }
                />{" "}
                New Arrival
              </label>

              <label
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={
                    productData.isFlashDeal
                  }
                  onChange={
                    handleCheckboxChange
                  }
                />{" "}
                Flash Deal
              </label>
            </div>

            {/* MAIN IMAGE */}

            <div
              style={{
                border:
                  "2px dashed #ff9900",
                padding: "20px",
                textAlign: "center",
                position: "relative",
                borderRadius: "8px",
                background: "#fffdf9",
              }}
            >
              <FaCloudUploadAlt
                style={{
                  fontSize: "2rem",
                  color: "#ff9900",
                }}
              />

              <p
                style={{
                  fontWeight: "600",
                }}
              >
                Click to select main
                presentation photo
              </p>

              <input
                type="file"
                accept="image/*"
                required
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                onChange={
                  handleMainImageChange
                }
              />

              {mainImageFile && (
                <p
                  style={{
                    color: "green",
                    fontSize: "0.85rem",
                    marginTop: "8px",
                  }}
                >
                  📸 Attached:{" "}
                  {mainImageFile.name}
                </p>
              )}
            </div>

            {/* BEST SELLER IMAGE */}

            {productData.isBestSeller && (
              <div
                style={{
                  border:
                    "2px dashed #d97706",
                  padding: "20px",
                  textAlign: "center",
                  background: "#fffbeb",
                  position: "relative",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "#d97706",
                    fontWeight: "700",
                  }}
                >
                  🔥 Upload Best Seller
                  Custom Image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={
                    handleBestSellerImageChange
                  }
                />

                {bestSellerImageFile && (
                  <p
                    style={{
                      color: "#d97706",
                      fontSize: "0.85rem",
                    }}
                  >
                    Attached:{" "}
                    {bestSellerImageFile.name}
                  </p>
                )}
              </div>
            )}

            {/* NEW ARRIVAL IMAGE */}

            {productData.isNewArrival && (
              <div
                style={{
                  border:
                    "2px dashed #2563eb",
                  padding: "20px",
                  textAlign: "center",
                  background: "#eff6ff",
                  position: "relative",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                  }}
                >
                  ✨ Upload New Arrival
                  Custom Image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={
                    handleNewArrivalImageChange
                  }
                />

                {newArrivalImageFile && (
                  <p
                    style={{
                      color: "#2563eb",
                      fontSize: "0.85rem",
                    }}
                  >
                    Attached:{" "}
                    {newArrivalImageFile.name}
                  </p>
                )}
              </div>
            )}

            {/* FLASH DEAL IMAGE */}

            {productData.isFlashDeal && (
              <div
                style={{
                  border:
                    "2px dashed #dc2626",
                  padding: "20px",
                  textAlign: "center",
                  background: "#fef2f2",
                  position: "relative",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "#dc2626",
                    fontWeight: "700",
                  }}
                >
                  ⚡ Upload Flash Deal
                  Custom Image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={
                    handleFlashDealImageChange
                  }
                />

                {flashDealImageFile && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.85rem",
                    }}
                  >
                    Attached:{" "}
                    {flashDealImageFile.name}
                  </p>
                )}
              </div>
            )}

            {/* DESCRIPTION */}

            <textarea
              name="description"
              rows="4"
              placeholder="Detailed Specifications Description (Optional)"
              value={productData.description}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border:
                  "1px solid #cbd5e1",
                resize: "vertical",
              }}
            />

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading
                  ? "#94a3b8"
                  : "#ff9900",
                color: "#fff",
                padding: "14px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "700",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "1rem",
              }}
            >
              {loading
                ? "Adding Product..."
                : "+ Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
