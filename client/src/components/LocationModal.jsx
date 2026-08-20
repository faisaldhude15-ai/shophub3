import React, { useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const LocationModal = ({ isOpen, onClose, onSave }) => {
  const [selectedCity, setSelectedCity] = useState("Karachi");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedCity);
    onClose();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999, fontFamily: "sans-serif" }}>
      <div style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", width: "90%", maxWidth: "380px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", position: "relative" }}>
        
        <button onClick={onClose} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#64748b" }}>
          <FaTimes />
        </button>

        <h3 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 12px 0", color: "#0f172a", fontSize: "1.15rem", fontWeight: "800" }}>
          <FaMapMarkerAlt style={{ color: "#ff9900" }} /> Shipping Destination
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 16px 0", fontWeight: "600" }}>Select your city to check correct fast logistics speeds updates.</p>

        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Country / Region</label>
        <select disabled style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#f8fafc", marginBottom: "14px", fontWeight: "600" }}>
          <option>Pakistan</option>
        </select>

        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Select Delivery City *</label>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "20px", outline: "none" }}>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Rawalpindi">Rawalpindi</option>
          <option value="Faisalabad">Faisalabad</option>
          <option value="Multan">Multan</option>
          <option value="Peshawar">Peshawar</option>
          <option value="Quetta">Quetta</option>
        </select>

        <button onClick={handleSave} style={{ width: "100%", background: "#ff9900", color: "#000", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" }}>
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
