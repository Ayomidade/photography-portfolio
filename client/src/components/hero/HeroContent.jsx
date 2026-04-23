/**
 * HeroContent
 *
 * Centered text over the hero — matches Andrew Esiebo homepage exactly.
 * Name + tagline + contact details, all in white over the dark background.
 */

const HeroContent = () => {
  return (
    <div
      className="animate-fade-up"
      style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        color: "#fff",
        padding: "0 24px",
      }}
    >
      {/* Name */}
      <h1
        className="animate-fade-up"
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(28px, 4.5vw, 52px)",
          fontWeight: 300,
          letterSpacing: "0.06em",
          lineHeight: 1.2,
          marginBottom: "20px",
        }}
      >
        Anthony Monday
      </h1>

      {/* Tagline */}
      <p
        className="animate-fade-up-delay-1"
        style={{
          fontSize: "14px",
          fontWeight: 300,
          letterSpacing: "0.18em",
          color: "#fff",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          marginBottom: "24px",
          maxWidth: "480px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.9,
        }}
      >
        Visual Artist and Documentary Photographer.
      </p>

      {/* Contact */}
      {/* <p
        className="animate-fade-up-delay-2"
        style={{
          fontSize: "12px",
          letterSpacing: "0.15em",
          color: "#fff",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <span style={{ marginRight: "20px" }}>anthonymonday15@gmail.com</span><br/>
        <span>+234 915 430 2032</span>
      </p> */}
    </div>
  );
};

export default HeroContent;
