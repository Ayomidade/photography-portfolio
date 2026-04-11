import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Collections", to: "/collections" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

const socialLinks = [
  { label: "Instagram", to: "#" },
  { label: "500px", to: "#" },
  { label: "Prints", to: "#" },
];


const MobileNav = ({ isOpen, close }) => {
  
  const location = useLocation();

  // close on route change
  useEffect(() => {
    close();
  }, [location.pathname]);

  const { theme } = useTheme();

  return (
    <div
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        background:
          theme === "dark" ? "rgba(8, 8, 8, 0.98)" : "rgb(102, 102, 102)",
        zIndex: 105,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Nav links */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={close}
            style={({ isActive }) => ({
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 8vw, 48px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: isActive ? "var(--accent)" : "var(--menu)",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              width: "70%",
              textAlign: "center",
              transition: "color var(--transition)",
            })}
          >
            {label}
          </NavLink>
        ))}

        {/* Close menu button */}
        <button
          onClick={close}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(32px, 8vw, 48px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--menu)",
            textDecoration: "none",
            padding: "14px 0",
            borderBottom: "1px solid var(--border)",
            width: "70%",
            textAlign: "center",
            transition: "color var(--transition)",
          }}
        >
          Close
        </button>

        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Toggle Theme
          </p>
          <ThemeToggle />
        </div>
      </nav>

      {/* Social links */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          gap: "28px",
        }}
      >
        {socialLinks.map(({ label, to }) => (
          <a
            key={label}
            href={to}
            onClick={close}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(232, 228, 220, 0.3)",
              textDecoration: "none",
              transition: "color var(--transition)",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
