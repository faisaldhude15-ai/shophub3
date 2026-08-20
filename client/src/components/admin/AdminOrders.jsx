import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaBoxOpen, FaCalendarAlt, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const AdminOrders = () => {
  const [shippingLogs, setShippingLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dispatchedIds, setDispatchedIds] = useState([]);

  // Unified function to sync and retrieve live logs fresh from server database
  const fetchAdminShippingLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/admin/addresses");
      setShippingLogs(response.data.addresses || []);
      setLoading(false);
    } catch (error) {
      console.error("Error pulling database records:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminShippingLogs();
  }, []);

  const formatOrderDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  const handleDispatchAction = (id, name) => {
    setDispatchedIds((prev) => [...prev, id]);
    alert(`Order for ${name} dispatched! 🚚`);
  };

  // 🗑️ DELETION LOGIC HANDLER: Permanently wipes out item from screen array and MongoDB database
  const handleDeleteAction = async (id, name) => {
    const confirmSystemPurge = window.confirm(`Are you sure you want to permanently delete the shipping profile card of "${name}"?`);
    
    if (confirmSystemPurge) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/orders/admin/addresses/${id}`);
        if (response.data.success) {
          alert("Log document deleted successfully! 🗑️");
          fetchAdminShippingLogs(); // Triggers direct re-fetch sync down from server
        }
      } catch (error) {
        console.error("Failed to execute data deletion sync query:", error);
        // Safety frontend fallback: filters out array instance card if database server drops connections
        setShippingLogs((prev) => prev.filter((item) => item._id !== id));
      }
    }
  };

  if (loading) {
    return <div className="admin-orders-loader">Fetching Your Live MongoDB Datasets...</div>;
  }

  return (
    <div className="admin-orders-dashboard-wrapper">
      <style>{`
        .admin-orders-dashboard-wrapper { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: 'Segoe UI', system-ui, sans-serif; }
        .admin-orders-dashboard-wrapper h2 { font-size: 1.8rem; color: #0f172a; margin: 0 0 6px 0; font-weight: 700; }
        .admin-subtitle-description { font-size: 0.95rem; color: #64748b; margin-bottom: 30px; }
        .admin-orders-loader { text-align: center; padding: 100px; font-weight: 600; color: #475569; }
        .admin-shipping-manifest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
        .manifest-log-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.01); display: flex; flex-direction: column; gap: 14px; position: relative; overflow: hidden; }
        .manifest-log-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #ff9900; }
        .manifest-card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
        .manifest-card-header h3 { font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; text-transform: capitalize; display: flex; align-items: center; gap: 8px; }
        .log-date-badge { font-size: 0.78rem; background: #e2e8f0; color: #1e293b; padding: 4px 8px; border-radius: 4px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .manifest-data-body { display: flex; flex-direction: column; gap: 10px; }
        .data-meta-row { display: flex; gap: 12px; font-size: 0.92rem; color: #334155; line-height: 1.5; }
        .data-meta-row svg { margin-top: 3px; font-size: 0.95rem; color: #64748b; flex-shrink: 0; }
        .manifest-card-footer { margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 14px; display: flex; gap: 10px; width: 100%; }
        
        .admin-action-dispatch-btn { flex: 1.5; background: #ff9900; color: #ffffff; border: none; padding: 10px 14px; font-size: 0.85rem; font-weight: 700; border-radius: 6px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .admin-action-dispatch-btn:hover { background: #e68a00; }
        .dispatched-success-state { background: #16a34a !important; cursor: default; }
        
        /* 🗑️ Trash Button Styling Accent */
        .admin-action-delete-btn { flex: 0.5; background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; padding: 10px; font-size: 0.95rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .admin-action-delete-btn:hover { background: #dc2626; color: #ffffff; border-color: #dc2626; box-shadow: 0 4px 10px rgba(220,38,38,0.15); }
      `}</style>

      <h2>Admin Order Fulfilment Directory</h2>
      <p className="admin-subtitle-description">Review live database user shipping parameters and manage courier handovers.</p>

      <div className="admin-shipping-manifest-grid">
        {shippingLogs.length > 0 ? (
          shippingLogs.map((log) => {
            const isDispatched = dispatchedIds.includes(log._id);
            return (
              <div key={log._id} className="manifest-log-card">
                <div className="manifest-card-header">
                  <h3><FaUser style={{ color: "#ff9900" }} /> {log.fullName}</h3>
                  <span className="log-date-badge"><FaCalendarAlt /> {formatOrderDate(log.createdAt)}</span>
                </div>
                <div className="manifest-data-body">
                  <div className="data-meta-row"><FaPhone /> <span><strong>Phone:</strong> {log.phone}</span></div>
                  <div className="data-meta-row"><FaEnvelope /> <span><strong>Email:</strong> {log.email || "N/A"}</span></div>
                  <div className="data-meta-row"><FaMapMarkerAlt /> <span><strong>Address:</strong> {log.address}</span></div>
                  <div className="data-meta-row"><FaBoxOpen /> <span><strong>City / Postal:</strong> <span style={{ textTransform: "capitalize" }}>{log.city}</span> ({log.postalCode || "N/A"})</span></div>
                </div>
                
                <div className="manifest-card-footer">
                  <button 
                    className={`admin-action-dispatch-btn ${isDispatched ? "dispatched-success-state" : ""}`} 
                    onClick={() => !isDispatched && handleDispatchAction(log._id, log.fullName)}
                  >
                    {isDispatched ? <><FaCheckCircle /> Dispatched</> : "Dispatch Order Package"}
                  </button>
                  
                  {/* 🗑️ CONNECTED TRASH TRIGGER BUTTON ELEMENT */}
                  <button 
                    className="admin-action-delete-btn" 
                    onClick={() => handleDeleteAction(log._id, log.fullName)}
                    title="Delete Shipping Log"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b", gridColumn: "1/-1" }}>
            <h3>No Active Shipping Logs Mapped Yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
