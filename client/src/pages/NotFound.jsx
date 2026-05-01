/**
 * NotFound — 404 page, on-brand minimal style.
 */

import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "1px",
            background: "var(--muted)",
          }}
        />
        404
      </p>

      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(56px, 10vw, 112px)",
          fontWeight: 300,
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: "20px",
          fontStyle: "italic",
        }}
      >
        Not Found
      </h1>

      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.1em",
          color: "var(--muted)",
          marginBottom: "40px",
          maxWidth: "340px",
          lineHeight: 1.8,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        style={{
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--bg)",
          background: "var(--text)",
          padding: "13px 32px",
          transition: "opacity var(--transition)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
