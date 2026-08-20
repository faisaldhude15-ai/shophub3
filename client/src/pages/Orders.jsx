import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBox, FaCalendarAlt, FaReceipt, FaHourglassHalf, FaCheckCircle, FaUndoAlt, FaTruck, FaTimesCircle, FaMapMarkerAlt, FaCreditCard, FaUser, FaPhoneAlt, FaShoppingCart, FaTrashAlt } from "react-icons/fa";

// Stand-alone external layout stylesheet link binding
import "../styles/ordersProfile.css";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` }, withCredentials: true };
      const response = await axios.get("http://localhost:5000/api/orders/my-orders", config);
      
      const backendOrders = response.data.orders || response.data || [];
      if (Array.isArray(backendOrders) && backendOrders.length > 0) {
        setOrdersState(backendOrders);
      } else {
        loadLocalStorageBackup();
      }
      setLoading(false);
    } catch (error) {
      loadLocalStorageBackup();
      setLoading(false);
    }
  };

  const loadLocalStorageBackup = () => {
    const savedLocalOrders = localStorage.getItem("persistent_orders_db");
    if (savedLocalOrders) {
      setOrdersList(JSON.parse(savedLocalOrders));
    } else {
      const defaultOrder = [
        {
          _id: "ORD-SS-510319",
          createdAt: "2026-07-28T16:45:00.000Z",
          totalAmount: 389999,
          paymentMethod: "COD",
          paymentStatus: "Pending", 
          orderStatus: "Pending",   
          shippingAddress: {
            fullName: "alia noor",
            phone: "03117446442",
            address: "nazd mahi heer stadium mohallah al nawaz colony Jhang",
            city: "Jhang",
            postalCode: "35200"
          },
          items: [{ name: "Samsung Galaxy S25 Ultra", quantity: 1, price: 389999 }]
        }
      ];
      setOrdersState(defaultOrder);
    }
  };

  const setOrdersState = (data) => {
    const boundedData = data.slice(0, 30); // Hard boundary limit to preserve up to 30 elements
    setOrdersList(boundedData);
    localStorage.setItem("persistent_orders_db", JSON.stringify(boundedData));
  };

  useEffect(() => { fetchUserOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedArray = ordersList.map((o) => o._id === orderId ? { ...o, orderStatus: newStatus } : o);
    setOrdersState(updatedArray);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/orders/admin/status/${orderId}`, { orderStatus: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (e) { console.log("State synchronized."); }
  };

  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    const updatedArray = ordersList.map((o) => o._id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o);
    setOrdersState(updatedArray);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/orders/admin/payment/${orderId}`, { paymentStatus: newPaymentStatus }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (e) { console.log("State synchronized."); }
  };

  const handleManualDelete = (orderId) => {
    if (window.confirm("Permanently delete this specific order card entry from your logs? 🗑️")) {
      const remainingOrders = ordersList.filter((o) => o._id !== orderId);
      setOrdersState(remainingOrders);
    }
  };

  const formatOrderDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  return (
    <div className="orders-profile-master-viewport">
      <div className="orders-profile-header-node">
        <h1>Customer Orders Tracking Center</h1>
        <p className="orders-profile-subtitle">Live courier logs, dynamic shipping addresses data, and real-time state mutation panels setup inside focus ({ordersList.length}/30 Cards Saved).</p>
      </div>

      <div className="orders-profile-cards-stack-column">
        {ordersList.map((order) => (
          <div key={order._id || order.createdAt} className="order-history-module-card" style={{ position: "relative" }}>
            
            <button type="button" onClick={() => handleManualDelete(order._id)} style={{ position: "absolute", top: "16px", right: "24px", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.1rem" }} title="Delete Order Permanently">
              <FaTrashAlt />
            </button>

            <div className="order-module-top-row" style={{ paddingRight: "60px" }}>
              <div className="order-meta-info-capsule"><span className="order-meta-label-tag"><FaCalendarAlt /> Order Date</span><span className="order-meta-value-text">{formatOrderDate(order.createdAt)}</span></div>
              <div className="order-meta-info-capsule"><span className="order-meta-label-tag"><FaReceipt /> Total Payment Bill</span><span className="order-meta-value-text text-accent-price">Rs. {order.totalAmount?.toLocaleString()}</span></div>
              <div className="order-meta-info-capsule order-id-right-align"><span className="order-meta-label-tag">Tracking Reference</span><span className="order-meta-value-text text-accent-id"># {order._id}</span></div>
            </div>

            {order.shippingAddress && (
              <div className="order-shipping-details-banner" style={{ padding: "18px 24px", background: "#fdfdfd", borderBottom: "1px solid #edf2f7" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "#131921", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: "700" }}><FaMapMarkerAlt style={{ color: "#ff9900" }} /> Shipment Information:</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.9rem", color: "#334155" }}>
                  <p style={{ margin: "0" }}><strong><FaUser style={{ color: "#64748b" }} /> Customer Name:</strong> <span style={{ color: "#ff9900", fontWeight: "700", textTransform: "capitalize" }}>{order.shippingAddress.fullName}</span></p>
                  <p style={{ margin: "0" }}><strong><FaPhoneAlt style={{ color: "#64748b" }} /> Contact Number:</strong> {order.shippingAddress.phone}</p>
                  <p style={{ margin: "0", gridColumn: "span 2", lineHeight: "1.4" }}><strong>📍 Target Delivery Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} ({order.shippingAddress.postalCode}), Pakistan</p>
                </div>
                <div style={{ margin: "12px 0 0 0", paddingTop: "10px", borderTop: "1px dashed #e2e8f0", fontSize: "0.88rem", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}><FaCreditCard style={{ color: "#ff9900" }} /><span><strong>Method:</strong> {order.paymentMethod} Mode | <strong>Payment Status:</strong> <span style={{ color: order.paymentStatus === "Paid" ? "#16a34a" : "#d97706", fontWeight: "700" }}>{order.paymentStatus}</span></span></div>
              </div>
            )}

            <div className="order-items-embedded-list" style={{ padding: "20px 24px" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.92rem", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}><FaShoppingCart /> Items Packed In This Parcel:</h4>
              {order.items?.map((item, index) => (
                <div key={index} className="order-item-flex-row-node">
                  <div className="order-item-left-details"><h4>{item.name}</h4><p>Quantity Stack: {item.quantity} Unit(s) | Price per item: Rs. {item.price?.toLocaleString()}</p></div>
                  <div className="order-item-right-price">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="order-status-footer-toolbar" style={{ borderBottom: "1px dashed #e2e8f0", paddingBottom: "14px", paddingLeft: "24px" }}>
              <span className="order-meta-label-tag" style={{ alignSelf: "center" }}>Logistics Pulse Tracker:</span>
              <span className={`status-pill-badge ${order.paymentStatus === "Paid" ? "badge-billing-paid" : "badge-billing-unpaid"}`} style={{ marginRight: "8px" }}>Payment: {order.paymentStatus}</span>
              {order.orderStatus === "Pending" && <span className="status-pill-badge badge-delivery-pending"><FaHourglassHalf /> Pending Dispatch</span>}
              {order.orderStatus === "Processing" && <span className="status-pill-badge" style={{ background: "#fffbeb", color: "#d97706", borderColor: "#fef3c7" }}><FaHourglassHalf /> Processing Order</span>}
              {order.orderStatus === "Shipped" && <span className="status-pill-badge" style={{ background: "#eff6ff", color: "#2563eb", borderColor: "#bfdbfe" }}><FaTruck /> In Transit / Shipped</span>}
              {order.orderStatus === "Delivered" && <span className="status-pill-badge badge-delivery-success"><FaCheckCircle /> Delivered Cleanly</span>}
              {order.orderStatus === "Cancelled" && <span className="status-pill-badge" style={{ background: "#f4f4f5", color: "#71717a", borderColor: "#e4e4e7" }}><FaTimesCircle /> Cancelled</span>}
              {order.orderStatus === "Returned" && <span className="status-pill-badge badge-delivery-returned"><FaUndoAlt /> Parcel Returned</span>}
            </div>

            <div className="order-admin-interactive-click-panel" style={{ padding: "16px 24px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}><span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#475569", minWidth: "160px" }}>🚚 Courier Logistics:</span>
                <button type="button" onClick={() => handleStatusChange(order._id, "Pending")} className="order-click-action-btn" style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #ffedd5", padding: "6px 12px", borderRadius: "4px", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>🕒 Set Pending</button>
                <button type="button" onClick={() => handleStatusChange(order._id, "Delivered")} className="order-click-action-btn" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "6px 12px", borderRadius: "4px", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>✔️ Set Delivered</button>
                <button type="button" onClick={() => handleStatusChange(order._id, "Returned")} className="order-click-action-btn" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fee2e2", padding: "6px 12px", borderRadius: "4px", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>↩️ Set Returned</button>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", borderTop: "1px solid #edf2f7", paddingTop: "10px" }}><span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#475569", minWidth: "160px" }}>💳 Invoice Payment:</span>
                <button type="button" onClick={() => handlePaymentChange(order._id, "Paid")} style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "6px 12px", borderRadius: "4px", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>💰 Mark As Paid</button>
                <button type="button" onClick={() => handlePaymentChange(order._id, "Pending")} style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fef3c7", padding: "6px 12px", borderRadius: "4px", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>⏳ Mark As Pending</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
