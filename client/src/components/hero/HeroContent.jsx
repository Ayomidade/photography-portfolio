import BtnPrimary from "@/components/ui/BtnPrimary";
import BtnGhost from "@/components/ui/BtnGhost";

const HeroContent = () => {
  return (
    <div
      className="animate-fade-up"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "0 48px 72px",
        maxWidth: "700px",
      }}
    >
      {/* Eyebrow */}
      <p
        className="animate-fade-up-delay-1"
        style={{
          fontSize: "10px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "30px",
            height: "1px",
            background: "var(--accent)",
            flexShrink: 0,
          }}
        />
        Documentary Photography
        {/* <span
          style={{
            display: "inline-block",
            width: "40px",
            height: "1px",
            background: "var(--accent)",
            flexShrink: 0,
          }}
        /> */}
      </p>

      {/* Heading */}
      <h1
        className="animate-fade-up-delay-1"
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(52px, 7vw, 88px)",
          fontWeight: 300,
          lineHeight: 1.05,
          marginBottom: "24px",
          letterSpacing: "-0.01em",
          color: "var(--text)",
        }}
      >
        Every moment
        <br />
        tells the{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>truth</em>
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-up-delay-2"
        style={{
          fontSize: "12px",
          letterSpacing: "0.15em",
          color: "var(--muted)",
          lineHeight: 1.8,
          maxWidth: "380px",
          marginBottom: "40px",
        }}
      >
        Capturing the world through a lens, one story at a time. Documenting
        life as it unfolds, raw, real and unfiltered.
      </p>

      {/* CTAs */}
      <div
        className="animate-fade-up-delay-3"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <BtnPrimary label="View Portfolio" to="/portfolio" />
        <BtnGhost label="Explore Collections" to="/collections" />
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-content-wrap {
            padding: 0 24px 80px !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .hero-content-wrap {
            padding: 0 20px 72px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroContent;
