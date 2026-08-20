import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Core product details inputs and switch checkboxes state
  const [productData, setProductData] = useState({
    name: "", price: "", discountPrice: "", category: "Mobiles", brand: "", stock: "", description: "",
    isBestSeller: false, isNewArrival: false, isFlashDeal: false
  });

  // Isolated files tracking objects state references
  const [mainImageFile, setMainImageFile] = useState(null);
  const [bestSellerImageFile, setBestSellerImageFile] = useState(null);
  const [newArrivalImageFile, setNewArrivalImageFile] = useState(null);
  const [flashDealImageFile, setFlashDealImageFile] = useState(null);

  const handleInputChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.value });
  const handleCheckboxChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.checked });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    
    // Mapping default text inputs metadata properties
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("brand", productData.brand);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);
    formData.append("description", productData.description || "");

    // Secure mapping representation string representations for flags
    formData.append("isBestSeller", String(productData.isBestSeller));
    formData.append("isNewArrival", String(productData.isNewArrival));
    formData.append("isFlashDeal", String(productData.isFlashDeal));

    // File arrays matching configurations payload (Multer parsing friendly format)
    if (mainImageFile && mainImageFile[0]) {
      formData.append("images", mainImageFile[0]);
    }
    if (productData.isBestSeller && bestSellerImageFile && bestSellerImageFile[0]) {
      formData.append("bestSellerImage", bestSellerImageFile[0]);
    }
    if (productData.isNewArrival && newArrivalImageFile && newArrivalImageFile[0]) {
      formData.append("newArrivalImage", newArrivalImageFile[0]);
    }
    if (productData.isFlashDeal && flashDealImageFile && flashDealImageFile[0]) {
      formData.append("flashDealImage", flashDealImageFile[0]);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.status === 201 || response.data.success) {
        alert("🎉 Success! Product added with dynamic layout sections!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Network payload transmission logs breakdown:", error);
      alert(error.response?.data?.message || "Failed to append core parameters.");
    } finally { 
      setLoading(false); 
    }
  };
  return (
    <div className="admin-add-product-layout" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <AdminSidebar />
      <div className="admin-add-product-content" style={{ flex: 1, marginLeft: "260px", padding: "40px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px", fontWeight: "800", color: "#0f172a" }}>Add New Product Stock</h1>
        <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", maxWidth: "800px" }}>
          
          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input type="text" name="name" required placeholder="Product Title *" value={productData.name} onChange={handleInputChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            <input type="number" name="price" required placeholder="Price *" value={productData.price} onChange={handleInputChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            <input type="text" name="brand" required placeholder="Brand *" value={productData.brand} onChange={handleInputChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            <input type="number" name="stock" required placeholder="Stock *" value={productData.stock} onChange={handleInputChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />

            {/* Checkboxes mapping box row strip */}
            <div style={{ display: "flex", gap: "20px", background: "#f8fafc", padding: "15px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <label style={{ fontWeight: "700", cursor: "pointer" }}><input type="checkbox" name="isBestSeller" checked={productData.isBestSeller} onChange={handleCheckboxChange} /> Best Seller</label>
              <label style={{ fontWeight: "700", cursor: "pointer" }}><input type="checkbox" name="isNewArrival" checked={productData.isNewArrival} onChange={handleCheckboxChange} /> New Arrival</label>
              <label style={{ fontWeight: "700", cursor: "pointer" }}><input type="checkbox" name="isFlashDeal" checked={productData.isFlashDeal} onChange={handleCheckboxChange} /> Flash Deal</label>
            </div>

            {/* Main Primary Core Upload File Interface Input Block */}
            <div style={{ border: "2px dashed #ff9900", padding: "20px", textAlign: "center", position: "relative", borderRadius: "8px", background: "#fffdf9" }}>
              <FaCloudUploadAlt style={{ fontSize: "2rem", color: "#ff9900" }} />
              <p style={{ fontWeight: "600" }}>Click to select main presentation photo</p>
              <input type="file" required style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} onChange={(e) => setMainImageFile(e.target.files)} />
              {mainImageFile && mainImageFile[0] && <p style={{ color: "green", fontSize: "0.85rem", marginTop: "4px" }}>📸 Attached: {mainImageFile[0].name}</p>}
            </div>

            {/* --- Conditional Selection Targets Section Map Dropzones --- */}
            {productData.isBestSeller && (
              <div style={{ border: "2px dashed #d97706", padding: "20px", textAlign: "center", background: "#fffbeb", position: "relative", borderRadius: "8px" }}>
                <p style={{ color: "#d97706", fontWeight: "700" }}>🔥 Upload Best Seller Custom Image *</p>
                <input type="file" required style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} onChange={(e) => setBestSellerImageFile(e.target.files)} />
                {bestSellerImageFile && bestSellerImageFile[0] && <p style={{ color: "#d97706", fontSize: "0.85rem", marginTop: "4px" }}>Attached: {bestSellerImageFile[0].name}</p>}
              </div>
            )}

            {productData.isNewArrival && (
              <div style={{ border: "2px dashed #2563eb", padding: "20px", textAlign: "center", background: "#eff6ff", position: "relative", borderRadius: "8px" }}>
                <p style={{ color: "#2563eb", fontWeight: "700" }}>✨ Upload New Arrival Custom Image *</p>
                <input type="file" required style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} onChange={(e) => setNewArrivalImageFile(e.target.files)} />
                {newArrivalImageFile && newArrivalImageFile[0] && <p style={{ color: "#2563eb", fontSize: "0.85rem", marginTop: "4px" }}>Attached: {newArrivalImageFile[0].name}</p>}
              </div>
            )}

            {productData.isFlashDeal && (
              <div style={{ border: "2px dashed #dc2626", padding: "20px", textAlign: "center", background: "#fef2f2", position: "relative", borderRadius: "8px" }}>
                <p style={{ color: "#dc2626", fontWeight: "700" }}>⚡ Upload Flash Deal Custom Image *</p>
                <input type="file" required style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} onChange={(e) => setFlashDealImageFile(e.target.files)} />
                {flashDealImageFile && flashDealImageFile[0] && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: "4px" }}>Attached: {flashDealImageFile[0].name}</p>}
              </div>
            )}

            <div>
              <textarea name="description" rows="3" placeholder="Detailed Specifications Description (Optional)" value={productData.description} onChange={handleInputChange} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}></textarea>
            </div>

            <button type="submit" disabled={loading} style={{ background: "#ff9900", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" }}>
              {loading ? "Saving Product System Content..." : "+ Add Product Stock"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddProduct; // ⚡ Fixed missing layer token export default statement completely!
