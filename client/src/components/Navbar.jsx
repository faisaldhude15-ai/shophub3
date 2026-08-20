import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
    FaShoppingCart,
    FaUser,
    FaSearch
} from "react-icons/fa";

// ⚡ CORE FIX: Imported the Logo asset layout seamlessly
import Logo from "./Logo"; 
import "../styles/navbar.css";

const Navbar = () => {
  const cartContext = useContext(CartContext);
  const cartCount = cartContext ? cartContext.cartCount : 0;

  return (
    <nav className="navbar-container">
      {/* ⚡ BRAND IDENTITY LOGO INTERACTION GRID */}
      <div className="navbar-logo">
        <Logo />
      </div>

      {/* Global Dynamic Directory Search Bar */}
      <div className="navbar-search-wrapper">
        <input 
          type="text" 
          placeholder="Search items, premium brands, and electronics..." 
          className="navbar-search-input"
        />
        <button className="navbar-search-submit-btn">
          <FaSearch />
        </button>
      </div>

      {/* Central Navigation Interface Links */}
      <div className="navbar-links-panel">
        <Link to="/shop" className="navbar-nav-item">Shop</Link>
        <Link to="/wishlist" className="navbar-nav-item">Wishlist</Link>
        
        {/* Route to Order Ledger Section Panel */}
        <Link to="/orders" className="navbar-nav-item">My Orders</Link>

        {/* User Workspace Profile Entry Route */}
        <Link to="/login" className="navbar-profile-trigger">
          <FaUser />
          <span>Login</span>
        </Link>

        {/* FIXED STABLE CART LINK ACCESSIBILITY CONTAINER */}
        <Link to="/cart" className="cart-link navbar-cart-trigger">
          <div className="navbar-cart-icon-wrapper">
            <FaShoppingCart />
            {cartCount > 0 && <span className="navbar-cart-badge-counter">{cartCount}</span>}
          </div>
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
