/**
 * BtnPrimary
 *
 * Solid filled button — dark background, white text on light theme.
 * Inverts on dark theme automatically via CSS variables.
 */

import { Link } from "react-router-dom";

const style = {
  display: "inline-block",
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "var(--bg)",
  background: "var(--text)",
  padding: "13px 32px",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontWeight: 400,
  transition: "opacity var(--transition)",
};

const BtnPrimary = ({ label, to, href, onClick }) => {
  const hover = (e) => (e.currentTarget.style.opacity = "0.7");
  const leave = (e) => (e.currentTarget.style.opacity = "1");

  if (to)
    return (
      <Link to={to} style={style} onMouseEnter={hover} onMouseLeave={leave}>
        {label}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={hover}
        onMouseLeave={leave}
      >
        {label}
      </a>
    );
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={hover}
      onMouseLeave={leave}
    >
      {label}
    </button>
  );
};

export default BtnPrimary;
