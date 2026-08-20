import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          padding: "20px",
          background: "#f3f4f6",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;