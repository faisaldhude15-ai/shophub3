import React from "react";
import { Link } from "react-router-dom"; // ⚡ CORE FIX: Added Link import for smooth routing
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Company Profile Description */}
        <div className="footer-column">
          <h3>ShopSphere</h3>
          <p>
            Your trusted online shopping destination.
            Quality products with fast delivery.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Service & Profiles */}
        <div className="footer-column">
          <h3>Customer Service</h3>
          <ul>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Secure Admin Links & Social Icons */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons" style={{ marginBottom: "20px" }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>

          {/* 🔒 ADMIN ENTRY LINK: Added a clean click link to hop straight into your admin layout */}
          <h3>Management Portal</h3>
          <ul>
            <li>
              <Link to="/admin" style={{ color: "#ff9900", fontWeight: "700" }}>
                🔒 Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Baseline Dynamic Copyright Indicator */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopSphere. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
