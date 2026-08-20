import React, { useState } from "react"; // ⚡ useState add kiya
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import LocationModal from "./LocationModal"; // ⚡ Import dynamic popup modal
import "../styles/header.css";

const Header = () => {
  // ⚡ Modal visible/invisible dynamic states trackers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState("Pakistan");

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <p>🔥 Free Delivery On Orders Above Rs. 1000</p>
      </div>

      <div className="header-main">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">ShopSphere</Link>
        </div>

        {/* ⚡ UPDATED: Click handler attached to activate dynamic city overlays */}
        <div className="header-location" onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }}>
          <FaMapMarkerAlt />
          <div>
            <span>Deliver To</span>
            <strong>{deliveryCity}</strong>
          </div>
        </div>

        {/* Account */}
        <div className="header-account">
          <Link to="/login">
            <span>Hello, Sign in</span>
            <strong>Account & Lists</strong>
          </Link>
        </div>

        {/* Orders */}
        <div className="header-orders">
          <Link to="/orders">
            <span>Returns</span>
            <strong>& Orders</strong>
          </Link>
        </div>

        {/* Cart */}
        <div className="header-cart">
          <Link to="/cart">
            <FaShoppingCart />
            <strong>Cart</strong>
          </Link>
        </div>
      </div>

      {/* ⚡ POPUP MODAL HOOK CONTROLLER LINKED INJECTION */}
      <LocationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(city) => setDeliveryCity(city)} 
      />
    </header>
  );
};

export default Header;
