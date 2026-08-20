import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FaBolt, FaSync, FaPlusCircle, FaTrashAlt, FaSlidersH } from "react-icons/fa";

const FlashDeals = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // کارٹ ہینڈلر سنک کیا
  const cartContext = useContext(CartContext);
  const addToCart = cartContext ? cartContext.addToCart : null;

  // ڈیٹا بیس سے سیلز والا لائیو ڈیٹا لوڈ کرنے کا فنکشن
  const fetchFlashDeals = async () => {
    try {
      // ⚡ ٹائم اسٹیمپ اٹیچ کیا تاکہ براؤزر پرانی کیشے میموری چھوڑ دے
      const response = await axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`);
      const data = Array.isArray(response.data) ? response.data : (response.data.products || []);
      
      // ڈپلیکیٹ پروڈکٹس کو صاف کرنے کا فلٹر
      const uniqueCatalog = data.filter((p, i, self) => i === self.findIndex((item) => item._id === p._id));
      
      // ⚡ خودکار سیلز فلٹر: یہ صرف ان اشیاء کو اٹھائے گا جن کی ڈسکاؤنٹ پرائس اصل قیمت سے کم ہوگی
      const activeDeals = uniqueCatalog.filter(p => p.discountPrice && p.discountPrice < p.price);
      
      setProducts(activeDeals);
      setLoading(false);
    } catch (error) {
      console.error("Error pulling flash deals from database:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashDeals();
  }, []);

  if (loading) {
    return <div className="flash-deals-loader-node">Loading Active Limited-Time Sales...</div>;
  }

  return (
    <div className="flash-deals-section-box">
      {/* ⚡ پریمیم ایمبیڈڈ سی ایس ایس: زیرو پاتھ مسٹیک انشورنس */}
      <style>{`
        .flash-deals-section-box { background: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid #f0f3f6; margin-bottom: 30px; font-family: 'Segoe UI', system-ui, sans-serif; box-sizing: border-box; width: 100%; }
        
        /* سینٹرڈ سرخ سیلز ہیڈنگ اور لائن اینیمیشن */
        .flash-deals-section-box h2 { font-size: 1.6rem; font-weight: 700; color: #131921; margin-bottom: 25px; position: relative; padding-bottom: 12px; display: flex; align-items: center; justify-content: center; text-align: center; gap: 8px; }
        .flash-deals-section-box h2::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 70px; height: 3.5px; background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%); border-radius: 2px; }
        
        /* ٹاپ ایڈمن کنٹرول ڈیک */
        .flash-deals-admin-control-toolbar { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 14px 20px; border-radius: 8px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border: 1px solid #334155; }
        .flash-toolbar-left-labels { display: flex; align-items: center; gap: 8px; color: #f8fafc; font-size: 0.9rem; font-weight: 600; }
        .flash-toolbar-left-labels svg { color: #ef4444; }
        .flash-toolbar-right-actions-group { display: flex; gap: 10px; align-items: center; }
        
        /* سنک ڈیٹا بیس بٹن سٹائل */
        .flash-toolbar-action-sync-btn { background: #232f3e; color: #ef4444; border: 1px solid #334155; padding: 8px 12px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .flash-toolbar-action-sync-btn:hover { background: #ef4444; color: #ffffff; border-color: #ef4444; }
        
        .flash-toolbar-action-add-btn { background-color: #3b82f6; color: #ffffff; border: none; padding: 8px 16px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .flash-toolbar-action-remove-btn { background-color: #ffffff; color: #dc2626; border: 1px solid #fee2e2; padding: 8px 16px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        
        /* فلیش سیل کارڈز گریڈ */
        .flash-deals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 22px; justify-content: center; width: 100%; box-sizing: border-box; }
        .flash-deal-card { border: 1px solid #fca5a5 !important; background: linear-gradient(180deg, #ffffff 0%, #fffbfb 100%) !important; border-radius: 12px; padding: 16px; position: relative; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; box-sizing: border-box; }
        .flash-deal-card:hover { border-color: #ef4444 !important; box-shadow: 0 12px 24px rgba(239, 68, 68, 0.1) !important; transform: translateY(-4px); }
        
        /* چمکدار سرخ SAVE فیصد کا بیج */
        .flash-deal-badge { position: absolute; top: 12px; left: 12px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; z-index: 10; box-shadow: 0 2px 6px rgba(220,38,38,0.25); }
        .flash-img-frame { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; background: #fcf8f8; border-radius: 8px; margin-bottom: 12px; overflow: hidden; border: 1px solid #f3e8e8; }
        .flash-img-frame img { max-width: 88%; max-height: 88%; object-fit: contain; }
        
        .flash-deal-card h3 { font-size: 1.05rem; font-weight: 700; color: #111111; margin: 0 0 8px 0; height: 38px; overflow: hidden; }
        .flash-deal-card h3 a { text-decoration: none; color: inherit; }
        .flash-pricing-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .flash-new-price { font-size: 1.3rem; font-weight: 800; color: #dc2626; }
        .flash-old-price { font-size: 0.95rem; color: #94a3b8; text-decoration: line-through; }
        .flash-stock-indicator { font-size: 0.85rem; color: #64748b; margin: 0 0 16px 0; font-weight: 600; }
        .flash-add-cart-btn { background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%); border: none; color: white; padding: 11px; border-radius: 6px; font-weight: 700; font-size: 0.92rem; cursor: pointer; width: 100%; box-shadow: 0 3px 6px rgba(220,38,38,0.15); transition: background 0.2s; }
        .flash-add-cart-btn:hover { background: #b91c1c; }
        .flash-deals-loader-node { text-align: center; padding: 80px 20px; font-weight: 700; color: #64748b; }
        @media (max-width: 768px) { .flash-deals-grid { grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 12px; } .flash-deals-admin-control-toolbar { flex-direction: column; text-align: center; } .flash-toolbar-right-actions-group { width: 100%; flex-direction: column; } .flash-toolbar-action-add-btn, .flash-toolbar-action-remove-btn, .flash-toolbar-action-sync-btn { width: 100%; justify-content: center; } }
      `}</style>

      <h2><FaBolt style={{ color: "#ef4444" }} /> Flash Deals</h2>

      {/* مینیجر ایڈمن ٹول بار */}
      <div className="flash-deals-admin-control-toolbar">
        <div className="flash-toolbar-left-labels">
          <FaSlidersH /> 
          <span>Promotion Tracking Control Deck ({products.length} Active Deals)</span>
        </div>
        <div className="flash-toolbar-right-actions-group">
          <button type="button" className="flash-toolbar-action-sync-btn" onClick={fetchFlashDeals}>
            <FaSync /> Sync Database
          </button>
          <button type="button" className="flash-toolbar-action-add-btn" onClick={() => navigate("/admin/products/add")}>
            <FaPlusCircle /> + Add Product
          </button>
          <button type="button" className="flash-toolbar-action-remove-btn" onClick={() => navigate("/admin/products")}>
            <FaTrashAlt /> Remove / Delete
          </button>
        </div>
      </div>

      {/* لوپنگ ڈسکاؤنٹ گرڈ */}
      <div className="flash-deals-grid">
        {products.length > 0 ? (
          products.map((product) => {
            // فیصد میں بچت کا حساب لگانے کا ڈائینامک فارمولا
            const savings = Math.round(((product.price - product.discountPrice) / product.price) * 100);
            return (
              <div key={product._id} className="flash-deal-card">
                <div className="flash-deal-badge">SAVE {savings}%</div>
                <div className="flash-img-frame">
                  <img src={Array.isArray(product.images) ? product.images[0] : product.images || "/images/default.jpg"} alt={product.name} />
                </div>
                <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                <div className="flash-pricing-row">
                  <span className="flash-new-price">Rs {product.discountPrice.toLocaleString()}</span>
                  <span className="flash-old-price">Rs {product.price.toLocaleString()}</span>
                </div>
                <p className="flash-stock-indicator">Only {product.stock || 0} Left In Stock!</p>
                <button className="flash-add-cart-btn" onClick={() => addToCart && addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", width: "100%", padding: "40px", color: "#64748b", gridColumn: "1/-1", fontWeight: "600" }}>
            No products currently on discount sale inside MongoDB. Check "Flash Deal Sale" checkbox inside Add Form!
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
