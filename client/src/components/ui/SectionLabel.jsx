/**
 * SectionLabel
 *
 * Small uppercase tag above section titles.
 * On light theme renders in muted dark.
 * On dark theme renders in accent gold.
 */

const SectionLabel = ({ label }) => {
  return (
    <p
      style={{
        fontSize: "9px",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "var(--sans)",
        fontWeight: 400,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "24px",
          height: "1px",
          background: "var(--muted)",
          flexShrink: 0,
        }}
      />
      {label}
    </p>
  );
};

export default SectionLabel;
