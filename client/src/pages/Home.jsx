import React from "react";
import HeroSlider from "../components/HeroSlider";
import CategorySection from "../components/CategorySection";
import TrustBadges from "../components/TrustBadges"; 
import FlashDeals from "../components/FlashDeals";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoOffers from "../components/PromoOffers"; // ⚡ Promotional Grid Link Import kiya
import BestSeller from "../components/BestSeller";
import NewArrival from "../components/NewArrival";
import BrandSection from "../components/BrandSection";
import Newsletter from "../components/Newsletter";

import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <HeroSlider />

      {/* Categories */}
      <CategorySection />

      {/* Trust Ribbon Overview */}
      <TrustBadges />

      {/* Flash Deals */}
      <FlashDeals />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* ⚡ EXTRA PREMIUM LOOK GRID LAYOUT */}
      <PromoOffers />

      {/* Best Seller */}
      <BestSeller />

      {/* Promo Middle Banner Layout Strip */}
      <div className="promo-banner-strip" style={{ width: "100%", margin: "35px 0", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "16px", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", boxSizing: "border-box", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <span style={{ background: "#ff9900", color: "#000", padding: "4px 10px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "800" }}>LIMITED SPECIAL</span>
          <h2 style={{ fontSize: "1.8rem", margin: "8px 0 4px 0", fontWeight: "800" }}>Upgrade Your Premium Gear Ecosystem</h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>Get extra up to 15% instant checkout cashbacks on selected electronic accessories tracks.</p>
        </div>
        <button style={{ backgroundColor: "#ff9900", color: "#000", border: "none", padding: "12px 24px", fontWeight: "700", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" }}>Explore Catalog</button>
      </div>

      {/* New Products */}
      <NewArrival />

      {/* Brands */}
      <BrandSection />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

export default Home;
