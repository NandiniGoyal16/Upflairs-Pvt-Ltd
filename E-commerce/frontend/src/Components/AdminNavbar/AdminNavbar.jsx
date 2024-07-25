import React from "react";
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import navprofile from "../Assets/Admin/avatar.png";
import navlogo from "../Assets/logo.png";
import "./AdminNavbar.css";

const AdminLogo = () => {
  return (
    <Link to="/">
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <img src={navlogo} alt="" className="admin-nav-logo" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>My Shoppee</h2>
          <h5 style={{ color: "#9A3D3B" }}>Admin Panel</h5>
        </div>
      </div>
    </Link>
  );
};

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <AdminLogo />
      <img src={navprofile} className="admin-nav-profile" alt="" />
    </div>
  );
};

export default AdminNavbar;
