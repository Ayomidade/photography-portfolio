/**
 * StatCard
 *
 * Single stat box — used on Dashboard.
 * Clean white card with border, no shadows.
 *
 * Props:
 * - label (string)
 * - value (string|number)
 * - sub (string, optional)
 */

const StatCard = ({ label, value, sub }) => {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        padding: "28px 32px",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.35)",
          marginBottom: "16px",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "48px",
          fontWeight: 300,
          color: "#1a1a1a",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {value ?? "—"}
      </p>
      {sub && (
        <p
          style={{
            fontSize: "10px",
            color: "rgba(0,0,0,0.3)",
            letterSpacing: "0.08em",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
};

export default StatCard;
