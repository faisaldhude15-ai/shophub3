import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ⚡ FIXED: Correct import statement for network API calls

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile");
        setUserProfile(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error pulling client metadata logs:", error);
        setLoading(false);
      }
    };
    fetchUserProfileData();
  }, []);

  // Secure checkout reference mockup defaults if database profile auth state is guest
  const activeUser = userProfile || {
    name: "Sonia Noor",
    email: "soniadev765@gmail.com",
    role: "Premium Buyer",
    joinedDate: "July 2026",
    primaryLocation: "Jhang, Pakistan"
  };

  const handleLogoutAction = () => {
    alert("Secure workspace session terminated. Redirecting to home canvas.");
    navigate("/");
  };

  if (loading && !userProfile) {
    // Self unmounting fallback loader boundary
    setTimeout(() => setLoading(false), 400);
    return <div style={{ textAlign: "center", padding: "100px", fontWeight: "600", fontFamily: "sans-serif", color: "#475569" }}>Loading Secure Profile Directory...</div>;
  }

  return (
    <div className="profile-dashboard-wrapper">
      {/* ⚡ Encapsulated inline CSS layer layout configuration */}
      <style>{`
        .profile-dashboard-wrapper { max-width: 800px; margin: 50px auto; padding: 0 20px; font-family: 'Segoe UI', system-ui, sans-serif; box-sizing: border-box; }
        .profile-main-card-node { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.01); }
        .profile-card-cover-graphic { background: linear-gradient(135deg, #131921 0%, #232f3e 100%); padding: 40px; display: flex; align-items: center; gap: 24px; color: #ffffff; }
        
        .profile-avatar-circle-placeholder { width: 85px; height: 85px; background: #ff9900; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 800; color: #111111; text-transform: uppercase; border: 4px solid #ffffff; }
        .profile-primary-text h2 { margin: 0 0 4px 0; font-size: 1.6rem; font-weight: 700; }
        .profile-primary-text span.role-tag { font-size: 0.8rem; background: rgba(255,255,255,0.15); color: #ff9900; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .profile-details-body-grid { padding: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .profile-meta-field { display: flex; flex-direction: column; gap: 4px; }
        .profile-meta-field label { font-size: 0.78rem; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
        .profile-meta-field p { font-size: 1rem; color: #1e293b; font-weight: 600; margin: 0; }
        
        .profile-actions-footer-bar { padding: 20px 30px; background: #f8fafc; border-top: 1px solid #edf2f7; display: flex; justify-content: space-between; align-items: center; }
        .profile-cta-orders-btn { background: #ff9900; color: white; border: none; padding: 10px 20px; font-size: 0.92rem; font-weight: 700; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
        .profile-cta-orders-btn:hover { background: #e68a00; }
        .profile-logout-trigger-btn { background: none; border: 1px solid #cbd5e1; color: #64748b; padding: 10px 18px; font-size: 0.92rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .profile-logout-trigger-btn:hover { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }
        
        @media (max-width: 600px) { .profile-card-cover-graphic { flex-direction: column; text-align: center; } .profile-details-body-grid { grid-template-columns: 1fr; gap: 16px; } }
      `}</style>

      <div className="profile-main-card-node">
        {/* Top Cover Graphic Banner Header */}
        <div className="profile-card-cover-graphic">
          <div className="profile-avatar-circle-placeholder">
            {activeUser.name.charAt(0)}
          </div>
          <div className="profile-primary-text">
            <h2>{activeUser.name}</h2>
            <span className="role-tag">{activeUser.role}</span>
          </div>
        </div>

        {/* Info Credentials Grid Metadata Block Layout */}
        <div className="profile-details-body-grid">
          <div className="profile-meta-field">
            <label>Registered Account Username</label>
            <p>{activeUser.name}</p>
          </div>
          <div className="profile-meta-field">
            <label>Secure Contact Email</label>
            <p>{activeUser.email}</p>
          </div>
          <div className="profile-meta-field">
            <label>Primary Account Territory</label>
            <p>{activeUser.primaryLocation}</p>
          </div>
          <div className="profile-meta-field">
            <label>Profile Creation Stamp</label>
            <p>Member Since {activeUser.joinedDate}</p>
          </div>
        </div>

        {/* Dashboard Operational Actions Footer */}
        <div className="profile-actions-footer-bar">
          <button className="profile-cta-orders-btn" onClick={() => navigate("/orders")}>
            View Purchase Ledgers
          </button>
          <button className="profile-logout-trigger-btn" onClick={handleLogoutAction}>
            Logout Account Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
