/**
 * StatsRow
 *
 * Three statistics rendered in a row at the bottom of the About section.
 *
 * Props:
 * - `stats` (array) — [{ num: '7+', label: 'Years Shooting' }, ...]
 */

const StatsRow = ({ stats = [] }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        paddingTop: "32px",
        marginTop: "40px",
        borderTop: "1px solid var(--border)",
        flexWrap: "wrap",
      }}
    >
      {stats.map(({ num, label }) => (
        <div key={label}>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "36px",
              fontWeight: 300,
              color: "var(--accent)",
              display: "block",
              lineHeight: 1,
              marginBottom: "6px",
            }}
          >
            {num}
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
