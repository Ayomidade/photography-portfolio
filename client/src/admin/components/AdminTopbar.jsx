/**
 * AdminTopbar
 *
 * Sticky top bar inside admin layout.
 * Page title left, hamburger menu (mobile) and View Site link right.
 */

import { Link } from "react-router-dom";

const AdminTopbar = ({ title, onMenuToggle }) => {
  return (
    <div
      className="admin-topbar"
      style={{
        height: "56px",
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Hamburger Menu Button (mobile only) */}
      <button
        onClick={onMenuToggle}
        className="admin-menu-btn"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          marginRight: "12px",
          fontSize: "20px",
          color: "#000000",
        }}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <h1
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "18px",
          fontWeight: 300,
          fontStyle: "italic",
          color: "#000000",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h1>

      <Link
        to="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.6)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "Montserrat, sans-serif",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.6)")}
      >
        View Site →
      </Link>
    </div>
  );
};

export default AdminTopbar;
