import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Database se live complete stock pull karne ka handler function
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`);
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading admin inventory logs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ⚡ CRASH-PROOF AUTOMATED PATH CONVERTER FOR OLD AND NEW IMAGES
  const getProductImage = (product) => {
    // 1. Pehle makhsoos placements (Best Seller, New Arrival, Flash Deal) check karein
    let targetPath = product.bestSellerImage || product.newArrivalImage || product.flashDealImage;

    // 2. Agar koi custom placement image nahi hai, toh core gallery images uthayein
    if (!targetPath && product.images) {
      targetPath = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.images;
    }

    // 3. Agar kuch bhi nahi mila toh frontend default card fallback karein
    if (!targetPath) return "/images/default.jpg";

    // 4. Absolute paths and server endpoints route mapping
    if (targetPath.startsWith("http")) return targetPath;
    if (targetPath.startsWith("/images/")) return `http://localhost:5173${targetPath}`; // Local Vite public folder path
    return `http://localhost:5000${targetPath}`; // Backend Node Express server dynamic upload folder path
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely delete this product from database?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div style={{ marginLeft: "260px", padding: "40px", fontWeight: "700" }}>Loading Products Dashboard Logs...</div>;
  }

  return (
    <div className="admin-add-product-layout" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <AdminSidebar />
      
      <div className="admin-add-product-content" style={{ flex: 1, marginLeft: "260px", padding: "40px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Products Management</h1>
          <button onClick={() => navigate("/admin/products/add")} style={{ backgroundColor: "#ff9900", color: "#fff", border: "none", padding: "10px 20px", fontWeight: "700", borderRadius: "6px", cursor: "pointer" }}>
            + Add Product
          </button>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.015)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "sans-serif" }}>
            <thead>
              <tr style={{ background: "#232f3e", color: "white" }}>
                <th style={{ padding: "16px 20px" }}>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <img 
                      src={getProductImage(product)} 
                      alt={product.name} 
                      style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "6px", background: "#f8fafc", border: "1px solid #e2e8f0" }}
                      onError={(e) => { e.target.src = "/images/default.jpg"; }}
                    />
                  </td>
                  <td style={{ fontWeight: "700", color: "#1e293b" }}>{product.name}</td>
                  <td style={{ color: "#475569" }}>{product.category}</td>
                  <td style={{ fontWeight: "700", color: "#0f172a" }}>Rs. {product.price?.toLocaleString()}</td>
                  <td style={{ color: "#64748b" }}>{product.stock} Units</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => navigate(`/admin/products/edit/${product._id}`)} style={{ background: "#3b82f6", color: "white", border: "none", padding: "6px 14px", fontWeight: "700", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(product._id)} style={{ background: "#dc2626", color: "white", border: "none", padding: "6px 14px", fontWeight: "700", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
