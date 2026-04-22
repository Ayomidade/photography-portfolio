/**
 * Navbar
 *
 * Logo centered between two nav link groups.
 * Left: Home, Projects, Commissions
 * Right: About, Contact + ThemeToggle
 * Mobile: logo left, hamburger right → fullscreen MobileNav
 *
 * Gains a subtle box-shadow after scrolling 60px.
 */

import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "@/components/layout/MobileNav";
import useMobileNav from "@/hooks/useMobileNav";

const leftLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "images", to: "images" },
];

const rightLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const linkStyle = (isActive) => ({
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: isActive ? "var(--text)" : "var(--muted)",
  fontWeight: isActive ? 400 : 300,
  transition: "color var(--transition)",
});

const Navbar = () => {
  const { isOpen, toggle, close } = useMobileNav();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <MobileNav isOpen={isOpen} close={close} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-height)",
          zIndex: 100,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow var(--transition)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0 48px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Left links — desktop */}
          <ul
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "32px",
              flex: 1,
            }}
          >
            {leftLinks.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  style={({ isActive }) => linkStyle(isActive)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text)")
                  }
                  onMouseLeave={(e) => {}}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <div
            style={{
              flex: "0 0 auto",
              // padding: "0 40px",
            }}
          >
            <Link
              to="/"
              style={{
                fontFamily: "var(--sans)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--text)",
                whiteSpace: "nowrap",
              }}
            >
              Anthony Monday
            </Link>
          </div>

          {/* Right links — desktop */}
          <ul
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "32px",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {rightLinks.map(({ label, to }) => (
              <li key={label}>
                <NavLink to={to} style={({ isActive }) => linkStyle(isActive)}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Hamburger — mobile only */}
          <button
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="hamburger"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              width: "28px",
              padding: "4px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 110,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: i === 1 && isOpen ? "0%" : "100%",
                  height: "1px",
                  background: "var(--text)",
                  transition:
                    "transform 0.3s ease, opacity 0.25s ease, width 0.3s ease",
                  transformOrigin: "center",
                  transform:
                    isOpen && i === 0
                      ? "translateY(6px) rotate(45deg)"
                      : isOpen && i === 2
                        ? "translateY(-6px) rotate(-45deg)"
                        : "none",
                  opacity: isOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav > div { padding: 0 24px !important; }
        }
        @media (max-width: 480px) {
          nav > div { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
