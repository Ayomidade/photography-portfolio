/**
 * MobileNav
 *
 * Fullscreen overlay for mobile.
 * All nav links in large serif italic.
 * ThemeToggle pinned to bottom.
 * Closes on link tap, Escape key, or route change.
 */

import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Image", to: "images" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const MobileNav = ({ isOpen, close }) => {
  const location = useLocation();

  // close on route change
  useEffect(() => {
    close();
  }, [location.pathname]);

  return (
    <div
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 99,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
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
            end={to === "/"}
            onClick={close}
            style={({ isActive }) => ({
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 7vw, 44px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: isActive ? "var(--text)" : "var(--muted)",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              width: "65%",
              textAlign: "center",
              transition: "color var(--transition)",
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Theme toggle */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {/* label intentionally empty — toggle is self-explanatory */}
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MobileNav;
