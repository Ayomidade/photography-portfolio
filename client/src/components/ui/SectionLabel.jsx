const SectionLabel = ({ label }) => {
  return (
    <p
      style={{
        fontSize: "9px",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      {/* Decorative gold line */}
      <span
        style={{
          display: "inline-block",
          width: "28px",
          height: "1px",
          background: "var(--accent)",
          flexShrink: 0,
        }}
      />
      {label}
    </p>
  );
};

export default SectionLabel;
