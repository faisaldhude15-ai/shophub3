import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { FaPlusCircle, FaTrashAlt, FaFolderOpen, FaSlidersH, FaSync } from "react-icons/fa";

const NewArrival = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`);
      const data = Array.isArray(response.data) ? response.data : (response.data.products || []);
      
      const uniqueCatalog = data.filter((p, i, self) => i === self.findIndex((item) => item._id === p._id));
      
      // Sort dynamically by creation timestamps so freshest entries display first
      const timelineSorted = [...uniqueCatalog].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(timelineSorted.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error pulling new arrivals:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchNewArrivals(); }, []);

  if (loading) return <div className="newarrival-loader-node">Syncing New Arrivals...</div>;

  return (
    <div className="newarrival-section-box">
      <style>{`
        .newarrival-section-box { background: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.02); border: 1px solid #f0f3f6; margin-bottom: 30px; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', system-ui, sans-serif; }
        .newarrival-section-box h2 { font-size: 1.6rem; font-weight: 700; color: #131921; margin-bottom: 25px; position: relative; padding-bottom: 12px; display: flex; align-items: center; justify-content: center; text-align: center; gap: 8px; }
        .newarrival-section-box h2::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 70px; height: 3.5px; background: linear-gradient(90deg, #10b981 0%, #059669 100%); border-radius: 2px; }
        .newarrival-admin-control-toolbar { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 14px 20px; border-radius: 8px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border: 1px solid #334155; }
        .newarrival-toolbar-left-labels { display: flex; align-items: center; gap: 8px; color: #f8fafc; font-size: 0.9rem; font-weight: 600; }
        .newarrival-toolbar-left-labels svg { color: #10b981; }
        .newarrival-toolbar-right-actions-group { display: flex; gap: 10px; align-items: center; }
        .newarrival-toolbar-action-sync-btn { background: #232f3e; color: #10b981; border: 1px solid #334155; padding: 8px 12px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; }
        .newarrival-toolbar-action-add-btn { background-color: #3b82f6; color: #ffffff; border: none; padding: 8px 16px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .newarrival-toolbar-action-remove-btn { background-color: #ffffff; color: #dc2626; border: 1px solid #fee2e2; padding: 8px 16px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .newarrival-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 22px; justify-content: center; width: 100%; box-sizing: border-box; }
        @media (max-width: 768px) { .newarrival-products-grid { grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 12px; } .newarrival-admin-control-toolbar { flex-direction: column; } .newarrival-toolbar-right-actions-group { width: 100%; flex-direction: column; } .newarrival-toolbar-action-add-btn, .newarrival-toolbar-action-remove-btn, .newarrival-toolbar-action-sync-btn { width: 100%; justify-content: center; } }
      `}</style>

      <h2><FaFolderOpen style={{ color: "#10b981", fontSize: "1.4rem" }} /> New Arrivals</h2>

      <div className="newarrival-admin-control-toolbar">
        <div className="newarrival-toolbar-left-labels"><FaSlidersH /> <span>Timeline Tracking Control Deck ({products.length} Fresh Items Visible)</span></div>
        <div className="newarrival-toolbar-right-actions-group">
          <button type="button" className="newarrival-toolbar-action-sync-btn" onClick={fetchNewArrivals}><FaSync /> Sync Database</button>
          <button type="button" className="newarrival-toolbar-action-add-btn" onClick={() => navigate("/admin/products/add")}><FaPlusCircle /> + Add Product</button>
          <button type="button" className="newarrival-toolbar-action-remove-btn" onClick={() => navigate("/admin/products")}><FaTrashAlt /> Remove / Delete</button>
        </div>
      </div>
      
      <div className="newarrival-products-grid">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <div style={{ textAlign: "center", width: "100%", padding: "40px", color: "#64748b", gridColumn: "1/-1", fontWeight: "600" }}>No fresh stock arrivals recorded inside the system database yet.</div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
