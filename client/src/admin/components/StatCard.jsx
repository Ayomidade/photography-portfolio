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

const StatCard = ({ label, value, sub, accent = false }) => (
  <div
    style={{
      background: accent ? "#1a1a1a" : "#fff",
      border: "1px solid rgba(0,0,0,0.08)",
      padding: "24px 28px",
    }}
  >
    <p
      style={{
        fontSize: "8px",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: accent ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 400,
        marginBottom: "14px",
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontFamily: "Cormorant Garamond, Georgia, serif",
        fontSize: "44px",
        fontWeight: 300,
        color: accent ? "#fff" : "#1a1a1a",
        lineHeight: 1,
        marginBottom: "6px",
      }}
    >
      {value ?? "—"}
    </p>
    {sub && (
      <p
        style={{
          fontSize: "10px",
          color: accent ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 300,
          letterSpacing: "0.06em",
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

export default StatCard;