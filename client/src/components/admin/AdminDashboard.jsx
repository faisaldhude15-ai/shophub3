import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/admin/dashboard.css";

const AdminDashboard = () => {
  // ⚡ CORE FIX: Initializing all counters strictly at 0
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalShippingLogs: 0,
    grossRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const compileDashboardLiveMetrics = async () => {
      try {
        // Fetch all endpoints simultaneously
        const [usersRes, productsRes, shippingLogsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users").catch(() => ({ data: { users: [] } })),
          axios.get("http://localhost:5000/api/products").catch(() => ({ data: { products: [] } })),
          axios.get("http://localhost:5000/api/orders/admin/addresses").catch(() => ({ data: { addresses: [] } })),
          axios.get("http://localhost:5000/api/orders/admin/all").catch(() => ({ data: { orders: [] } }))
        ]);

        const usersArray = usersRes.data.users || [];
        const productsArray = productsRes.data.products || [];
        const shippingArray = shippingLogsRes.data.addresses || [];
        const ordersArray = ordersRes.data.orders || [];

        // ⚡ CORE FIX: Sum up actual revenue values from the database orders
        const calculatedRevenue = ordersArray.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

        // Commit real database lengths directly with no hardcoded fallbacks
        setStats({
          totalUsers: usersArray.length,
          totalProducts: productsArray.length,
          totalOrders: ordersArray.length,
          totalShippingLogs: shippingArray.length,
          grossRevenue: calculatedRevenue
        });
        setLoading(false);
      } catch (error) {
        console.error("Critical failure during analytics synchronization:", error);
        setLoading(false);
      }
    };

    compileDashboardLiveMetrics();
  }, []);

  if (loading) {
    return (
      <div className="admin-master-dashboard-layout" style={{ background: "#f8fafc" }}>
        <AdminSidebar />
        <div style={{ flex: 1, textAlign: "center", padding: "120px", fontWeight: "700", color: "#64748b", fontFamily: "sans-serif", fontSize: "1.1rem" }}>
          Synchronizing Live Database Counters...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-master-dashboard-layout">
      {/* Universal Fixed Left Sidebar Menu */}
      <AdminSidebar />

      {/* Main Content Viewport */}
      <div className="admin-main-content-viewport">
        <div className="admin-viewport-header-node">
          <h1>Admin Command Dashboard</h1>
          <p className="admin-viewport-subtitle">Review localized database tracking structures and core store metrics logs.</p>
        </div>

        {/* Live Counters Grid */}
        <div className="admin-analytical-stats-grid">
          
          {/* Card 1: Total Accounts */}
          <div className="admin-stats-card-node text-accent-blue">
            <div className="stats-card-inner-decorator"></div>
            <h3>Total Accounts</h3>
            <p className="stats-counter-value">{stats.totalUsers}</p>
            <span className="stats-trend-indicator-label">Active Profiles</span>
          </div>

          {/* Card 2: Products Track */}
          <div className="admin-stats-card-node text-accent-purple">
            <div className="stats-card-inner-decorator"></div>
            <h3>Products Track</h3>
            <p className="stats-counter-value">{stats.totalProducts}</p>
            <span className="stats-trend-indicator-label">In Catalog Database</span>
          </div>

          {/* Card 3: Total Orders */}
          <div className="admin-stats-card-node text-accent-green">
            <div className="stats-card-inner-decorator"></div>
            <h3>Total Orders</h3>
            <p className="stats-counter-value">{stats.totalOrders}</p>
            <span className="stats-trend-indicator-label">Completed Sales</span>
          </div>

          {/* Card 4: Shipping Logs */}
          <div className="admin-stats-card-node text-accent-orange">
            <div className="stats-card-inner-decorator"></div>
            <h3>Shipping Logs</h3>
            <p className="stats-counter-value">{stats.totalShippingLogs}</p>
            <span className="stats-trend-indicator-label">Synced Addresses</span>
          </div>

          {/* Card 5: Gross Revenue */}
          <div className="admin-stats-card-node text-accent-teal stats-card-grid-span-full">
            <div className="stats-card-inner-decorator"></div>
            <h3>Gross System Revenue</h3>
            <p className="stats-counter-value-currency">Rs. {stats.grossRevenue.toLocaleString()}</p>
            <span className="stats-trend-indicator-label">Total Real Cash Handled</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
