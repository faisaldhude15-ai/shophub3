import React from "react";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndoAlt } from "react-icons/fa";

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <FaShippingFast />,
      title: "Free Fast Shipping",
      desc: "On all orders above Rs. 5,000",
      color: "#3b82f6",
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "100% protected checkout keys",
      color: "#16a34a",
    },
    {
      id: 3,
      icon: <FaUndoAlt />,
      title: "Easy Return Policy",
      desc: "7-day money back guarantee",
      color: "#ef4444",
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: "24/7 Expert Support",
      desc: "Dedicated live tech help desk",
      color: "#ff9900",
    },
  ];

  return (
    <div className="trust-badges-container">
      <style>{`
        .trust-badges-container {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
          border: 1px solid #e2e8f0;
          margin-bottom: 35px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .badges-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          width: 100%;
        }
        .badge-single-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }
        .badge-single-card:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        }
        .badge-icon-frame {
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: 12px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .badge-text-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .badge-text-block h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
        }
        .badge-text-block p {
          margin: 0;
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 600;
        }
        @media (max-width: 576px) {
          .badge-single-card { padding: 12px; gap: 12px; }
          .badge-icon-frame { font-size: 1.5rem; padding: 10px; }
        }
      `}</style>

      <div className="badges-grid-wrapper">
        {badges.map((badge) => (
          <div key={badge.id} className="badge-single-card">
            <div className="badge-icon-frame" style={{ color: badge.color }}>
              {badge.icon}
            </div>
            <div className="badge-text-block">
              <h4>{badge.title}</h4>
              <p>{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
