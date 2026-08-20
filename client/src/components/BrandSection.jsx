import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { FaBookmark, FaHashtag, FaFire } from "react-icons/fa";

const BrandSection = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const data = Array.isArray(response.data) ? response.data : (response.data.products || []);
        setProducts(data);

        // ⚡ DYNAMIC BRAND EXTRACTOR: Loops over MongoDB items, grabs non-empty brand values, and removes duplicates
        const extractedBrands = data
          .map((p) => p.brand)
          .filter((brandName, index, self) => brandName && self.indexOf(brandName) === index);

        setBrands(extractedBrands);
        setLoading(false);
      } catch (error) {
        console.error("Error pulling live catalog brand layers:", error);
        setLoading(false);
      }
    };
    fetchBrandAssets();
  }, []);

  // Filter products row matrix based on selected active card parameter state
  const filteredProducts = selectedBrand === "All" 
    ? products 
    : products.filter((p) => p.brand?.toLowerCase() === selectedBrand?.toLowerCase());

  if (loading && products.length === 0) {
    return <div style={{ textAlign: "center", padding: "40px", color: "#64748b", fontWeight: "600" }}>Compiling Brand Partners Directory...</div>;
  }

  return (
    <div className="brand-section-box">
      {/* ⚡ PREMIUM EMBEDDED STYLING: Centers titles and creates premium interactive active chips grid */}
      <style>{`
        .brand-section-box {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          border: 1px solid #f0f3f6;
          margin-bottom: 30px;
          box-sizing: border-box;
          width: 100%;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        /* Perfectly centers the heading title layout across the viewport canvas */
        .brand-section-box h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #131921;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Perfectly centers the bottom accent decorative underline bar */
        .brand-section-box h2::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 3.5px;
          background: linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%); /* Deep purple theme accent line for top premium brands */
          border-radius: 2px;
        }

        /* Brand badge selector deck strip */
        .brand-interactive-selection-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .brand-badge-chip-cta {
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 10px 20px;
          font-size: 0.92rem;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: capitalize;
        }

        .brand-badge-chip-cta:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        /* ⚡ SELECTED PASSIVE STATE HIGHLIGHT LAYER: Changes theme parameters instantly */
        .brand-badge-chip-cta.active-brand-chip {
          background-color: #8b5cf6 !important;
          color: #ffffff !important;
          border-color: #8b5cf6 !important;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
        }

        .brand-filtered-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 22px;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .brand-section-box { padding: 16px; }
          .brand-interactive-selection-row { gap: 8px; margin-bottom: 24px; }
          .brand-badge-chip-cta { padding: 8px 14px; font-size: 0.85rem; }
          .brand-filtered-products-grid { grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 12px; }
        }
      `}</style>

      <h2>Top Brands</h2>

      {/* 🏷️ LIVE CHIPS NAVIGATION BAR: Click to toggle visible manufacturer logs grid blocks */}
      <div className="brand-interactive-selection-row">
        <button 
          className={`brand-badge-chip-cta ${selectedBrand === "All" ? "active-brand-chip" : ""}`}
          onClick={() => setSelectedBrand("All")}
        >
          All Brands
        </button>
        {brands.map((brandName, index) => (
          <button
            key={index}
            className={`brand-badge-chip-cta ${selectedBrand?.toLowerCase() === brandName?.toLowerCase() ? "active-brand-chip" : ""}`}
            onClick={() => setSelectedBrand(brandName)}
          >
            {brandName}
          </button>
        ))}
      </div>

      {/* Filtered outputs card display frame panel loop rendering block */}
      <div className="brand-filtered-products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div style={{ textAlign: "center", width: "100%", padding: "40px", color: "#64748b", gridColumn: "1/-1" }}>
            No active product matches found inside database inventory catalog for manufacturer segment "{selectedBrand}".
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSection;
