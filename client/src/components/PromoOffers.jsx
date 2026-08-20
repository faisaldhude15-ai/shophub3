import React from "react";

const PromoOffers = () => {
  const offers = [
    {
      id: 1,
      tag: "DEAL OF THE DAY",
      title: "Premium Smart Watches",
      desc: "Flat 20% Off on tech gears",
      bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
    },
    {
      id: 2,
      tag: "NEW ARRIVAL",
      title: "Audio Accessories",
      desc: "Latest high bass sound tracks",
      bg: "linear-gradient(135deg, #111827 0%, #374151 100%)"
    },
    {
      id: 3,
      tag: "BEST PRICE",
      title: "Camera & Optics Decks",
      desc: "Up to 3 years official warranty",
      bg: "linear-gradient(135deg, #701a75 0%, #d946ef 100%)"
    }
  ];

  return (
    <div className="promo-offers-container" style={{ width: "100%", marginBottom: "35px", boxSizing: "border-box", fontFamily: "sans-serif" }}>
      <style>{`
        .promo-offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; width: 100%; }
        .offer-card-node { padding: 24px; border-radius: 16px; color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; min-height: 160px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.03); transition: transform 0.3s ease; border: 1px solid rgba(255,255,255,0.05); }
        .offer-card-node:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); cursor: pointer; }
        .offer-tag-badge { background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 800; width: max-content; letter-spacing: 0.5px; }
        .offer-title-text { font-size: 1.3rem; font-weight: 800; margin: 12px 0 4px 0; letter-spacing: -0.3px; }
        .offer-desc-text { font-size: 0.85rem; color: rgba(255,255,255,0.8); margin: 0; font-weight: 600; }
        .offer-action-link { font-size: 0.85rem; font-weight: 700; color: #ff9900; margin-top: 15px; display: flex; align-items: center; gap: 4px; }
      `}</style>

      <div className="promo-offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card-node" style={{ background: offer.bg }}>
            <div>
              <div className="offer-tag-badge">{offer.tag}</div>
              <h3 className="offer-title-text">{offer.title}</h3>
              <p className="offer-desc-text">{offer.desc}</p>
            </div>
            <div className="offer-action-link">Shop Now →</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoOffers;
