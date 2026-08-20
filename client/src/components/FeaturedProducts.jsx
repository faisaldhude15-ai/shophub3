import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard"; 
import { FaBoxes, FaPlusCircle, FaSync, FaSlidersH } from "react-icons/fa";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`);
      const data = Array.isArray(response.data) ? response.data : (response.data.products || []);
      
      // ⚡ STRICT FILTER CORRECTION: Accounts for both real booleans and native FormData strings
      const cleanFeatured = data.filter(
        (p) => 
          p.isBestSeller !== true && p.isBestSeller !== "true" &&
          p.isNewArrival !== true && p.isNewArrival !== "true" &&
          p.isFlashDeal !== true && p.isFlashDeal !== "true"
      );
      
      setProducts(cleanFeatured);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching featured products metrics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="featured-loader-node">
        <div className="spinner-ring"></div>
        <span>Compiling Premium Featured Catalog...</span>
      </div>
    );
  }

  return (
    <div className="featured-section-box">
      <style>{`
        .featured-section-box { 
          background: #ffffff; 
          padding: 32px; 
          border-radius: 16px; 
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04); 
          border: 1px solid #e2e8f0; 
          margin-bottom: 35px; 
          box-sizing: border-box; 
          width: 100%; 
          font-family: 'Segoe UI', system-ui, sans-serif; 
        }
        
        /* Centered Header with Glowing Blue Accent Bar (Matching Best Seller) */
        .featured-section-box h2 { 
          font-size: 1.8rem; 
          font-weight: 800; 
          color: #0f172a; 
          margin: 0 0 28px 0; 
          position: relative; 
          padding-bottom: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
          letter-spacing: -0.5px;
        }
        .featured-section-box h2::after { 
          content: ""; 
          position: absolute; 
          bottom: 0; 
          left: 50%; 
          transform: translateX(-50%); 
          width: 80px; 
          height: 4px; 
          background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%); 
          border-radius: 4px; 
        }
        
        /* Sleek Modern Glassmorphism Admin Deck Toolbar (Matching Best Seller) */
        .featured-admin-control-toolbar { 
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
          padding: 16px 24px; 
          border-radius: 12px; 
          margin-bottom: 32px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          flex-wrap: wrap; 
          gap: 16px; 
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .toolbar-left-labels { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          color: #f8fafc; 
          font-size: 0.95rem; 
          font-weight: 700; 
          letter-spacing: 0.2px;
        }
        .toolbar-left-labels svg { 
          color: #ff9900; 
          font-size: 1.1rem;
        }
        .toolbar-right-actions-group { 
          display: flex; 
          gap: 12px; 
          align-items: center; 
        }
        
        /* Premium Action Control Buttons */
        .toolbar-action-sync-btn { 
          background: rgba(255, 255, 255, 0.06); 
          color: #ff9900; 
          border: 1px solid rgba(255, 153, 0, 0.3); 
          padding: 10px 16px; 
          border-radius: 8px; 
          font-weight: 700; 
          cursor: pointer; 
          font-size: 0.85rem; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          transition: all 0.25s ease;
        }
        .toolbar-action-sync-btn:hover { 
          background: #ff9900; 
          color: #0f172a; 
          box-shadow: 0 0 12px rgba(255, 153, 0, 0.4);
          transform: translateY(-1px);
        }
        .toolbar-action-add-btn { 
          background-color: #3b82f6; 
          color: #ffffff; 
          border: none; 
          padding: 10px 18px; 
          font-size: 0.85rem; 
          font-weight: 700; 
          border-radius: 8px; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          transition: all 0.25s ease; 
        }
        .toolbar-action-add-btn:hover { 
          background-color: #1d4ed8; 
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }
        
        /* Grid Alignment Matrix */
        .featured-products-grid-wrapper { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
          gap: 28px; 
          justify-content: center; 
          width: 100%; 
          box-sizing: border-box; 
        }
        
        /* Status Loader Styles */
        .featured-loader-node { 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          padding: 100px 20px; 
          font-weight: 700; 
          color: #475569; 
          font-size: 1.1rem;
        }
        .spinner-ring {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spinKey 0.8s linear infinite;
        }
        @keyframes spinKey {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) { 
          .featured-section-box { padding: 16px; }
          .featured-products-grid-wrapper { grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 16px; } 
          .featured-admin-control-toolbar { flex-direction: column; text-align: center; padding: 16px; } 
          .toolbar-right-actions-group { width: 100%; flex-direction: column; gap: 10px; } 
          .toolbar-action-add-btn, .toolbar-action-sync-btn { width: 100%; justify-content: center; } 
        }
      `}</style>

      <h2><FaBoxes style={{ color: "#ff9900", fontSize: "1.5rem" }} /> Featured Products</h2>

      <div className="featured-admin-control-toolbar">
        <div className="toolbar-left-labels">
          <FaSlidersH />
          <span>Featured Row Control Deck ({products.length} Active Cards)</span>
        </div>
        
        <div className="toolbar-right-actions-group">
          <button type="button" className="toolbar-action-sync-btn" onClick={fetchFeaturedProducts}>
            <FaSync /> Sync Row
          </button>
          <button type="button" className="toolbar-action-add-btn" onClick={() => navigate("/admin/products/add")}>
            <FaPlusCircle /> + Add Product
          </button>
        </div>
      </div>

      <div className="featured-products-grid-wrapper">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div style={{ textAlign: "center", width: "100%", padding: "50px 20px", color: "#64748b", gridColumn: "1/-1", fontWeight: "600", border: "2px dashed #e2e8f0", borderRadius: "12px", background: "#f8fafc" }}>
            No plain featured items inside database yet. New arrivals or best sellers are hidden from this row!
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
