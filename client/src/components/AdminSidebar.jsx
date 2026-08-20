import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaStar,
  FaTags,
  FaImage,
  FaWarehouse,
  FaChartBar,
  FaChartLine,
  FaBell,
  FaEnvelope,
  FaCog
} from "react-icons/fa";
import "../../styles/adminSidebar.css";

const AdminSidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin"
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users"
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products"
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders"
    },
    {
      name: "Reviews",
      icon: <FaStar />,
      path: "/admin/reviews"
    },
    {
      name: "Coupons",
      icon: <FaTags />,
      path: "/admin/coupons"
    },
    {
      name: "Banners",
      icon: <FaImage />,
      path: "/admin/banners"
    },
    {
      name: "Inventory",
      icon: <FaWarehouse />,
      path: "/admin/inventory"
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/admin/reports"
    },
    {
      name: "Analytics",
      icon: <FaChartLine />,
      path: "/admin/analytics"
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      path: "/admin/notifications"
    },
    {
      name: "Messages",
      icon: <FaEnvelope />,
      path: "/admin/messages"
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings"
    }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>ShopSphere</h2>
        <p>Admin Panel</p>
      </div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
