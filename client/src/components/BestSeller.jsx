import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // ⚡ Context link import kiya
import { FaPlusCircle, FaTrashAlt, FaStar, FaSlidersH, FaSync } from "react-icons/fa";

const BestSeller = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ Cart Context handling safety layer initialization
  const cartContext = useContext(CartContext);
  const addToCart = cartContext ? cartContext.addToCart : null;

  const fetchBestSellers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`);
      const data = Array.isArray(response.data) ? response.data : (response.data.products || []);
      
      const hotSellers = data.filter(
        (p) => 
          p.isBestSeller === true || 
          p.isBestSeller === "true" ||
          p.name?.toLowerCase().includes("watch") ||
          p.name?.toLowerCase().includes("halo") ||
          p.name?.toLowerCase() === "ssd"
      );
      
      setProducts(hotSellers);
      setLoading(false);
    } catch (error) {
      console.error("Error pulling database best seller metrics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <div className="bestseller-loader-node">
        <div className="spinner-ring"></div>
        <span>Compiling Most Popular Items...</span>
      </div>
    );
  }

  return (
    <div className="bestseller-section-box">
      <style>{`
        .bestseller-section-box { background: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0; margin-bottom: 35px; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', system-ui, sans-serif; }
        .bestseller-section-box h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0 0 28px 0; position: relative; padding-bottom: 14px; display: flex; align-items: center; justify-content: center; gap: 10px; letter-spacing: -0.5px; }
        .bestseller-section-box h2::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 4px; }
        
        .bestseller-admin-control-toolbar { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 16px 24px; border-radius: 12px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .toolbar-left-labels { display: flex; align-items: center; gap: 10px; color: #f8fafc; font-size: 0.95rem; font-weight: 700; }
        .toolbar-left-labels svg { color: #3b82f6; }
        .toolbar-right-actions-group { display: flex; gap: 12px; align-items: center; }
        
        .toolbar-action-sync-btn { background: rgba(255, 255, 255, 0.06); color: #ff9900; border: 1px solid rgba(255, 153, 0, 0.3); padding: 10px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; transition: all 0.25s ease; }
        .toolbar-action-sync-btn:hover { background: #ff9900; color: #0f172a; box-shadow: 0 0 12px rgba(255, 153, 0, 0.4); transform: translateY(-1px); }
        .toolbar-action-add-btn { background-color: #3b82f6; color: #ffffff; border: none; padding: 10px 18px; font-size: 0.85rem; font-weight: 700; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.25s ease; }
        .toolbar-action-add-btn:hover { background-color: #1d4ed8; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transform: translateY(-1px); }
        .toolbar-action-remove-btn { background-color: #ffffff; color: #ef4444; border: 1px solid #fee2e2; padding: 10px 18px; font-size: 0.85rem; font-weight: 700; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.25s ease; }
        .toolbar-action-remove-btn:hover { background-color: #ef4444; color: #ffffff; border-color: #ef4444; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2); transform: translateY(-1px); }
        
        /* ⚡ BEAUTIFUL INSULATED BEST SELLER CARDS GRID STYLING */
        .bestseller-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 28px; justify-content: center; width: 100%; box-sizing: border-box; }
        .bs-custom-card { border: 1px solid #e2e8f0; background: #ffffff; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; transition: all 0.3s ease; position: relative; }
        .bs-custom-card:hover { border-color: #3b82f6; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.08); transform: translateY(-4px); }
        .bs-img-window { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 8px; margin-bottom: 12px; overflow: hidden; border: 1px solid #f1f5f9; }
        .bs-img-window img { max-width: 90%; max-height: 90%; object-fit: contain; }
        .bs-custom-card h3 { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; height: 38px; overflow: hidden; }
        .bs-custom-card h3 a { text-decoration: none; color: inherit; }
        .bs-brand-label { font-size: 0.85rem; color: #64748b; font-weight: 600; margin: 0 0 10px 0; }
        .bs-price-tag { font-size: 1.25rem; font-weight: 800; color: #1d4ed8; margin-bottom: 14px; }
        
        /* ⚡ GLOWING BUTTON SYSTEM */
        .bs-add-to-cart-btn { background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); border: none; color: white; padding: 11px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; width: 100%; box-shadow: 0 3px 8px rgba(29, 78, 216, 0.15); transition: background 0.2s; margin-top: auto; }
        .bs-add-to-cart-btn:hover { background: #1e40af; box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3); }
        
        .bestseller-loader-node { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; padding: 100px 20px; font-weight: 700; color: #475569; font-size: 1.1rem; }
        .spinner-ring { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spinKey 0.8s linear infinite; }
        @keyframes spinKey { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .bestseller-products-grid { grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 14px; } .bestseller-admin-control-toolbar { flex-direction: column; text-align: center; } .toolbar-right-actions-group { width: 100%; flex-direction: column; } .toolbar-action-add-btn, .toolbar-action-remove-btn, .toolbar-action-sync-btn { width: 100%; justify-content: center; } }
      `}</style>

      <h2><FaStar style={{ color: "#3b82f6", fontSize: "1.5rem" }} /> Best Sellers</h2>

      <div className="bestseller-admin-control-toolbar">
        <div className="toolbar-left-labels">
          <FaSlidersH />
          <span>Best Seller Control Deck ({products.length} Active Cards)</span>
        </div>
        
        <div className="toolbar-right-actions-group">
          <button type="button" className="toolbar-action-sync-btn" onClick={fetchBestSellers}>
            <FaSync /> Sync Database
          </button>
          <button type="button" className="toolbar-action-add-btn" onClick={() => navigate("/admin/products/add")}>
            <FaPlusCircle /> + Add Product
          </button>
          <button type="button" className="toolbar-action-remove-btn" onClick={() => navigate("/admin/products")}>
            <FaTrashAlt /> Remove / Delete
          </button>
        </div>
      </div>
      
      <div className="bestseller-products-grid">
        {products.length > 0 ? (
          products.map((product) => {
            // ⚡ Handle image parsing paths seamlessly
            const imgPath = product.bestSellerImage 
              ? product.bestSellerImage 
              : (product.images && product.images[0] ? product.images[0] : "/images/default.jpg");

            return (
              <div key={product._id} className="bs-custom-card">
                <div className="bs-img-window">
                  <img 
                    src={imgPath.startsWith("/uploads") ? `http://localhost:5000${imgPath}` : imgPath} 
                    alt={product.name} 
                    onError={(e) => { e.target.src = "/images/default.jpg"; }}
                  />
                </div>
                <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                <p className="bs-brand-label">Brand: {product.brand || "Generic"}</p>
                <div className="bs-price-tag">Rs. {product.price?.toLocaleString()}</div>
                
                {/* ⚡ DIRECTLY ATTACHED ADD TO CART ACTION BUTTON ELEMENT */}
                <button 
                  type="button" 
                  className="bs-add-to-cart-btn"
                  onClick={() => addToCart && addToCart(product)}
                >
                  🛒 Add To Cart
                </button>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", width: "100%", padding: "50px 20px", color: "#64748b", gridColumn: "1/-1", fontWeight: "600", border: "2px dashed #e2e8f0", borderRadius: "12px", background: "#f8fafc" }}>
            No products tagged as Best Seller inside MongoDB yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
