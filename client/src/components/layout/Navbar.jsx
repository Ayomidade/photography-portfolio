import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "@/components/layout/MobileNav";
import useMobileNav from "@/hooks/useMobileNav";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Commissions", to: "/commissions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
const Navbar = () => {
  const { isOpen, toggle, close } = useMobileNav();
  const [scrolled, setScrolled] = useState(false);

  // add solid bg once user scrolls past hero
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 48px",
          background: scrolled
            ? "rgba(8, 8, 8, 0.97)"
            : "linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "var(--serif)",
            fontSize: "22px",
            fontWeight: 300,
            letterSpacing: "0.12em",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          Anthony{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Monday</em>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "40px",
            listStyle: "none",
          }}
          className="desktop-nav"
        >
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  textDecoration: "none",
                  transition: "color var(--transition)",
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side — desktop */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <ThemeToggle />
          <p
            // href="#"
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
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={toggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="hamburger"
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            background: isOpen ? "rgba(255,255,255,0.05)" : "none",
            border: "none",
            padding: 0,
            zIndex: 999, // 🔥 increase this
            position: "fixed",
            top: "20px",
            right: "20px",
            borderRadius: "6px",
            backdropFilter: isOpen ? "blur(6px)" : "none",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 && isOpen ? "0%" : "100%",
                height: "1px",
                background: isOpen ? "#fff" : "var(--text)",
                transition:
                  "transform 0.35s ease, opacity 0.3s ease, width 0.3s ease",
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
      </nav>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding: 20px 24px !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 18px 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
