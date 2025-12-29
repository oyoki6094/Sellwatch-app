import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCashRegister, FaUsers, FaBox, FaTachometerAlt, FaChartBar, FaCog, FaInfoCircle } from "react-icons/fa";
import { useSettings } from "../App";

function Sidebar() {
  const location = useLocation();
  const { theme } = useSettings();

  const links = [
    { path: "/", label: "Ventes", icon: <FaCashRegister /> },
    { path: "/clients", label: "Gestion Clients", icon: <FaUsers /> },
    { path: "/stock", label: "Stock", icon: <FaBox /> },
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/stats", label: "Stats", icon: <FaChartBar /> },
    { path: "/settings", label: "Paramètres", icon: <FaCog /> },
    { path: "/about", label: "À propos", icon: <FaInfoCircle /> },
  ];

  return (
    <div className="sidebar" style={{ background: theme.primary, color: theme.background }}>
      <div className="app-name" style={{ color: theme.background }}>Sellwatch</div>
      <nav>
        {links.map(link => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={active ? "active" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 15px",
                borderRadius: 8,
                textDecoration: "none",
                color: active ? theme.primary : theme.background,
                background: active ? theme.background : "transparent",
                fontWeight: active ? "bold" : "normal",
                transition: "all 0.3s ease",
                boxShadow: active ? "0 0 10px rgba(255,165,0,0.6)" : "none",
              }}
            >
              <span style={{ fontSize: 18 }}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
