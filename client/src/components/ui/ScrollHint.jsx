const ScrollHint = () => {
  return (
    <div
      aria-hidden="true"
      className="animate-fade-up-delay-2"
      style={{
        position: "absolute",
        bottom: "32px",
        right: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        color: "var(--muted)",
        fontSize: "9px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
      }}
    >
      {/* Animated vertical line */}
      <div
        className="scroll-line"
        style={{
          width: "1px",
          height: "50px",
          background: "linear-gradient(to bottom, var(--muted), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }}
      />
      Scroll
    </div>
  );
};

export default ScrollHint;
