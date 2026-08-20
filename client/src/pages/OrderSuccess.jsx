import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  // Generate a random mock tracking number dynamically
  const trackingNumber = "SS-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="success-canvas-holder">
      {/* ⚡ Embedded premium confirmation aesthetic interface styles */}
      <style>{`
        .success-canvas-holder { max-width: 600px; margin: 80px auto; padding: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.04); font-family: 'Segoe UI', system-ui, sans-serif; }
        .success-icon-wrapper { font-size: 4.5rem; color: #16a34a; margin-bottom: 20px; animation: scaleUpPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .success-canvas-holder h2 { font-size: 2rem; color: #111111; margin: 0 0 12px 0; font-weight: 700; }
        .success-desc-msg { color: #475569; font-size: 1.05rem; line-height: 1.5; margin: 0 0 24px 0; }
        
        .tracking-info-badge-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 30px; display: inline-block; width: 100%; box-sizing: border-box; }
        .tracking-info-badge-box p { margin: 6px 0; font-size: 0.95rem; color: #334155; }
        .tracking-number-string { font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #0f172a; background: #e2e8f0; padding: 2px 8px; border-radius: 4px; }
        
        .success-action-buttons-row { display: flex; gap: 16px; justify-content: center; }
        .success-cta-primary-btn { background: #ff9900; color: white; border: none; padding: 12px 24px; font-size: 1rem; font-weight: 700; border-radius: 8px; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 10px rgba(255,153,0,0.2); }
        .success-cta-primary-btn:hover { background: #e68a00; }
        .success-cta-secondary-btn { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 12px 24px; font-size: 1rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .success-cta-secondary-btn:hover { background: #e2e8f0; color: #1e293b; }
        
        @keyframes scaleUpPop {
          0% { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="success-icon-wrapper">
        <FaCheckCircle />
      </div>

      <h2>Order Placed Successfully!</h2>
      <p className="success-desc-msg">
        Thank you for your purchase. Your order has been registered via Cash on Delivery and is being processed for dispatch right away.
      </p>

      <div className="tracking-info-badge-box">
        <p>Tracking Code: <span className="tracking-number-string">{trackingNumber}</span></p>
        <p style={{ color: "#16a34a", fontWeight: "600" }}>Estimated Delivery: 2-3 Business Days</p>
      </div>

      <div className="success-action-buttons-row">
        <button className="success-cta-primary-btn" onClick={() => navigate("/orders")}>
          View Order Logs
        </button>
        <button className="success-cta-secondary-btn" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
