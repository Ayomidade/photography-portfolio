/**
 * About
 *
 * Full biography page — long form text in the style of Andrew Esiebo's about page.
 * Two column layout — sticky label left, bio text right on desktop.
 * Stacks on mobile.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import anthonyPhoto from "@/assets/hero.jpg";

const About = () => {
  const imageUrl =
    "https://scontent-los4-1.cdninstagram.com/v/t39.30808-6/460923564_18472940341004066_5618925657620535340_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzQ2NDE3MDcwNTQwNzQ2NDE4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjl4ODIwLnNkci5DMyJ9&_nc_ohc=zZBZY9pQJ0QQ7kNvwG6l88B&_nc_oc=AdrHxg7VPFXOBES7jjap3kCVTJKgtFaICUC8Dl02nt65kJNNVMHw2EwoUC4cFYLtebg&_nc_ad=z-m&_nc_cid=1520&_nc_zt=23&_nc_ht=scontent-los4-1.cdninstagram.com&_nc_gid=BRG7bCuvO6C68a63_whAlA&_nc_ss=7a32e&oh=00_Af0QdH9eqMpTnmnZjKqe0b7zmiWRI7ygtcxtzoTAGEvJ6Q&oe=69E803C2";
  return (
    <>
      <div
        style={{
          background: "var(--black)",
          padding: "var(--section-padding)",
          paddingTop: "160px",
        }}
      >
        {/* Page header */}
        <SectionLabel label="Biography" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(45px, 4vw, 40px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: "80px",
          }}
        >
          About
        </h1>

        {/* Bio layout */}
        <div
          className="about-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "80px",
            maxWidth: "1000px",
          }}
        >
          {/* Left — sticky info */}
          <div
            className="about-sidebar"
            style={{
              position: "sticky",
              top: "120px",
              alignSelf: "start",
            }}
          >
            {/* Portrait */}
            <img
              src={imageUrl}
              alt="Anthony Monday"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                marginBottom: "32px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "20px",
                fontWeight: 300,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              Anthony Monday
            </p>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              Visual Storyteller
            </p>
            <p
              style={{
                fontSize: "11px",
                lineHeight: 1.8,
                color: "var(--muted)",
              }}
            >
              Lagos, Nigeria
              <br />
              Available worldwide
            </p>
          </div>

          {/* Right — bio text */}
          <div style={{ maxWidth: "620px" }}>
            {[
              `Anthony Monday is an award-winning visual storyteller whose photography
              began with providing insight into the rapid urbanisation of Nigeria and its
              vibrant cultural and heritage sites. Over time, he has expanded into
              multimedia reportage, tackling a range of complex subjects — identity,
              spirituality, popular culture, and the African urban experience.`,

              `His work has been exhibited across West Africa and internationally,
              including at the Lagos Photo Festival, the Arles Photo Festival, and
              several major institutions in Europe and North America. His images have
              been published in National Geographic, The New York Times, The Guardian,
              CNN African Voices, and Bloomberg, among many others.`,

              `Anthony has collaborated with a number of local and international
              institutions on social documentary projects, including partnerships with
              ActionAid, National Geographic Society, and Women for Women International.`,

              `Dedicated to sharing skills and experience, Anthony leads photography
              training workshops and mentors emerging photographers across Nigeria.
              He has facilitated capacity-building projects that have helped foster
              the next generation of visual storytellers in Lagos and Kano.`,

              `Anthony Monday presently resides in Lagos, Nigeria, and continues to
              work on visual projects worldwide — using his lens as a means to tell
              stories that matter.`,
            ].map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: "14px",
                  lineHeight: 2,
                  color: i === 0 ? "var(--text)" : "var(--muted)",
                  marginBottom: "28px",
                  fontFamily: i === 0 ? "var(--serif)" : "var(--sans)",
                  fontSize: i === 0 ? "18px" : "13px",
                }}
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-layout {
            grid-template-columns: 220px 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-sidebar {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
};

export default About;
