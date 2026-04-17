/**
 * AboutStrip
 *
 * Split two-column about section used on the homepage.
 * Left side — atmospheric CSS art image panel (AboutImage)
 * Right side — artist statement, bio excerpt, CTA and stats
 *
 * No props — all content is static brand copy.
 */

import AboutImage from "./AboutImage";
import StatsRow from "./StatsRow";
import SectionLabel from "@/components/ui/SectionLabel";
import BtnPrimary from "@/components/ui/BtnPrimary";

const stats = [
  { num: "7+", label: "Years Shooting" },
  { num: "340", label: "Published Works" },
  { num: "12", label: "Projects" },
];

const AboutStrip = () => {
  return (
    <>
      <section
        className="about-strip"
        style={{
          background: "var(--black)",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          padding: 0,
        }}
      >
        {/* Left — image panel */}
        <AboutImage />

        {/* Right — content */}
        <div
          className="about-content"
          style={{
            padding: "80px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SectionLabel label="The Artist" />

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: "24px",
            }}
          >
            About{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Me</em>
          </h2>

          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "var(--text)",
              fontStyle: "italic",
              margin: "0 0 24px",
            }}
          >
            Photography is the art of{" "}
            <strong
              style={{
                fontStyle: "normal",
                color: "var(--accent)",
                fontWeight: 400,
              }}
            >
              waiting
            </strong>{" "}
            — for light to find its angle, for silence to grow heavy, for the
            world to exhale.
          </p>

          <p
            style={{
              fontSize: "12px",
              lineHeight: 2,
              color: "var(--muted)",
              maxWidth: "420px",
              marginBottom: "40px",
            }}
          >
            Anthony Monday is a visual storyteller based in Lagos, Nigeria,
            working across landscape, portrait, and documentary photography.
            Each image is a deliberate act — an attempt to freeze what the eye
            forgets and the soul remembers.
          </p>

          <BtnPrimary label="Read Full Bio" to="/about" />

          <StatsRow stats={stats} />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .about-strip {
            grid-template-columns: 1fr 1.2fr !important;
          }
          .about-content {
            padding: 60px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .about-strip {
            grid-template-columns: 1fr !important;
          }
          .about-content {
            padding: 40px 24px 64px !important;
          }
        }
        @media (max-width: 480px) {
          .about-content {
            padding: 36px 20px 56px !important;
          }
        }
      `}</style>
    </>
  );
};

export default AboutStrip;
