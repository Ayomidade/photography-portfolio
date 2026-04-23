/**
 * Footer
 *
 * Minimal bottom bar — logo left, socials center, copyright right.
 * Matches the Andrew Esiebo footer structure.
 */

import { Link } from "react-router-dom";

const socials = [
  { label: "Instagram", href: "https://instagram.com/anthonymonday15/" },
  // { label: "Facebook", href: "#" },
  // { label: "LinkedIn", href: "#" },
];

const Footer = () => {
  return (
    <>
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "36px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg)",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Anthony Monday
        </Link>

        <ul style={{ display: "flex", gap: "28px" }}>
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  transition: "color var(--transition)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p
          style={{
            fontSize: "9px",
            color: "var(--muted)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Anthony Monday Photography
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          footer {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center !important;
            padding: 32px 20px !important;
          }
          footer ul { flex-wrap: wrap; justify-content: center; gap: 16px !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;
