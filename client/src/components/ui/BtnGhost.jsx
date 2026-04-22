/**
 * BtnGhost
 *
 * Text + arrow link. Muted color, darkens on hover.
 * Arrow slides right on hover.
 */

import { Link } from "react-router-dom";

const style = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--muted)",
  textDecoration: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontWeight: 300,
  transition: "color var(--transition)",
};

const BtnGhost = ({ label, to, href, onClick }) => {
  const hover = (e) => {
    e.currentTarget.style.color = "var(--text)";
    const arrow = e.currentTarget.querySelector(".btn-arrow");
    if (arrow) arrow.style.transform = "translateX(4px)";
  };
  const leave = (e) => {
    e.currentTarget.style.color = "var(--muted)";
    const arrow = e.currentTarget.querySelector(".btn-arrow");
    if (arrow) arrow.style.transform = "translateX(0)";
  };

  const inner = (
    <>
      {label}
      <span
        className="btn-arrow"
        style={{ transition: "transform var(--transition)", fontSize: "12px" }}
      >
        →
      </span>
    </>
  );

  if (to)
    return (
      <Link to={to} style={style} onMouseEnter={hover} onMouseLeave={leave}>
        {inner}
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
        {inner}
      </a>
    );
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={hover}
      onMouseLeave={leave}
    >
      {inner}
    </button>
  );
};

export default BtnGhost;
