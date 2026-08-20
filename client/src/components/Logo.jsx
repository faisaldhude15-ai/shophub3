import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="shopsphere-premium-logo-anchor">
      {/* ⚡ INSULATED PREMIUM BRAND IDENTITY CSS CONFIGURATIONS */}
      <style>{`
        .shopsphere-premium-logo-anchor {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          user-select: none;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
        }

        .shopsphere-premium-logo-anchor:hover {
          transform: scale(1.03); /* Subtle fluid zoom on logo row hover */
        }

        /* 📦 Injected precise dimensional rendering boxes for your custom purple graphic logo icon */
        .logo-graphic-vector-frame {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 10px rgba(124, 58, 237, 0.25)); /* Luminous shadow core element */
        }

        .logo-graphic-vector-frame svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* ⚡ UPDATED TYPOGRAPHY: Clean modern system font stack with a premium gradient color fill */
        .logo-text-string-brandmark {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #ffcc00 0%, #ff9900 100%); /* Metallic golden-yellow gradient theme match */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.55rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .logo-text-string-brandmark .accent-dot-color {
          color: #7c3aed; /* Extracted premium matching purple theme hue tone for dot accentuation */
          -webkit-text-fill-color: #7c3aed; /* Overrides gradient clip logic to lock solid purple color */
          font-weight: 900;
          margin-left: 1px;
        }
      `}</style>

      {/* 🎨 TARGET VECTOR EMBEDDED GRAPHIC: Pure Purple "S" Sphere Concept Icon Shape */}
      <div className="logo-graphic-vector-frame">
        <svg viewBox="0 0 100 100" xmlns="http://w3.org">
          {/* Top curve flourish segment node */}
          <path 
            d="M 50 0 A 45 45 0 0 1 95 45 C 95 65, 75 75, 55 55 C 35 35, 30 15, 50 0 Z" 
            fill="#7c3aed" 
          />
          {/* Bottom mirror swirl dynamic segment node */}
          <path 
            d="M 50 100 A 45 45 0 0 1 5 55 C 5 35, 25 25, 45 45 C 65 65, 70 85, 50 100 Z" 
            fill="#7c3aed" 
          />
        </svg>
      </div>

      {/* 📝 UPDATED LOGO LABEL TEXT MARKS LAYER */}
      <h1 className="logo-text-string-brandmark">
        ShopSphere<span className="accent-dot-color">.</span>
      </h1>

    </Link>
  );
};

export default Logo;
