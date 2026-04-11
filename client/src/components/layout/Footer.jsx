import { Link } from "react-router-dom";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "500px", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Newsletter", href: "#" },
];

const Footer = () => {
  return (
    <>
      <footer
        style={{
          background: "var(--deep)",
          borderTop: "1px solid var(--border)",
          padding: "48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "var(--serif)",
            fontSize: "20px",
            fontWeight: 300,
            letterSpacing: "0.1em",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          Anthony{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
            Monday
          </em>
        </Link>

        {/* Social links */}
        <ul
          style={{
            display: "flex",
            gap: "32px",
            listStyle: "none",
          }}
        >
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(232, 228, 220, 0.3)",
                  textDecoration: "none",
                  transition: "color var(--transition)",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(232, 228, 220, 0.3)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p
          style={{
            fontSize: "10px",
            color: "rgba(232, 228, 220, 0.2)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Anthony Monday Photography
        </p>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          footer {
            flex-direction: column !important;
            gap: 24px !important;
            text-align: center !important;
            padding: 40px 24px !important;
          }
          footer ul {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 480px) {
          footer { padding: 32px 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;
