/**
 * ScrollHint
 *
 * Animated scroll indicator — bottom center of Hero on desktop.
 * Hidden on mobile.
 */

const ScrollHint = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="scroll-hint"
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          color: "rgba(255,255,255,0.45)",
          fontSize: "8px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          animation: "fadeIn 1.4s 0.6s ease both",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "36px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        Scroll
      </div>

      <style>{`
        @media (max-width: 768px) {
          .scroll-hint { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default ScrollHint;
