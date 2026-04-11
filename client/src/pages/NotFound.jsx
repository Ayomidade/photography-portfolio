import { Link } from "react-router-dom";
// import "../styles/global.css";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--black)",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "28px",
            height: "1px",
            background: "var(--accent)",
          }}
        />
        404 Error
        <span
          style={{
            display: "inline-block",
            width: "28px",
            height: "1px",
            background: "var(--accent)",
          }}
        />
      </p>

      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(64px, 12vw, 120px)",
          fontWeight: 300,
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: "24px",
        }}
      >
        Lost in the{" "}
        <em style={{ color: "var(--accent)", fontStyle: "italic" }}>dark</em>
      </h1>

      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.15em",
          color: "var(--muted)",
          maxWidth: "360px",
          lineHeight: 1.8,
          marginBottom: "48px",
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
          color: "var(--black)",
          background: "var(--accent)",
          padding: "14px 32px",
          transition: "opacity 0.3s ease",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
