/**
 * AdminSidebar
 *
 * Fixed left navigation — logo, nav links, admin info, sign out.
 * Light background, subtle borders.
 * Active route highlighted with a left border accent.
 */

import { NavLink } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

const links = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "◈" },
  { label: "Projects", to: "/admin/projects", icon: "◫" },
  { label: "Photos", to: "/admin/photos", icon: "◧" },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { admin, logout } = useAdminAuth();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 45,
            display: "none",
          }}
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? "mobile-open" : ""}`}
        style={{
          width: "220px",
          minHeight: "100vh",
          background: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "28px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#000000",
                marginBottom: "2px",
              }}
            >
              Anthony Monday
            </p>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Admin Panel
            </p>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="admin-sidebar-close"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#000000",
              padding: "0",
              lineHeight: 1,
            }}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {links.map(({ label, to, icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px 24px",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? "#000000" : "rgba(0,0,0,0.6)",
                textDecoration: "none",
                borderLeft: isActive
                  ? "2px solid #000000"
                  : "2px solid transparent",
                background: isActive ? "rgba(0,0,0,0.03)" : "transparent",
                transition: "color 0.2s ease, background 0.2s ease",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: isActive ? 400 : 300,
              })}
            >
              <span style={{ fontSize: "13px", opacity: 0.6 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              color: "rgba(0,0,0,0.6)",
              marginBottom: "12px",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Signed in as{" "}
            <span style={{ color: "#000000", fontWeight: 400 }}>
              {admin?.username}
            </span>
          </p>
          <button
            onClick={logout}
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              background: "none",
              border: "1px solid rgba(0,0,0,0.12)",
              padding: "8px 16px",
              cursor: "pointer",
              width: "100%",
              fontFamily: "Montserrat, sans-serif",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1a1a1a";
              e.currentTarget.style.borderColor = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(0,0,0,0.4)";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
