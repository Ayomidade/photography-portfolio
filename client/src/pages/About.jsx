/**
 * About
 *
 * Portrait left, long-form bio right — sticky sidebar on desktop.
 * Exact Andrew Esiebo about page structure and content.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import SEO from "@/components/SEO";

const paragraphs = [
  `Born in Lagos, Nigeria. Anthony Monday is a visual storyteller who started his 
career in documentary and conceptual photography. Monday’s work often 
explores personal confronting issues, memories and identity themes.`,

  `For example, “Na Young We Young, No Be Craze We Craze” is a photography 
body of work that explores the significance of hairstyles among the youth of the 
urban city of Lagos. Using hairstyle in highlighting how young people assert their 
individuality, self-expression and self-acceptance through their hairstyles in the 
face of societal norms.`,

  `“A Glass Of Identity” is another body of work that reinforces the the subject of 
identity, personality, and religious preferences focusing on the windscreen and 
dashboards of Lagos yellow buses, popularly known as “Danfo” and tricycles in the 
metropolitan city of Lagos, paste symbols, pictorial posters, and mementoes to
express their innermost beliefs while peacefully coexisting with others who may 
have conflicting views.`,

  `Anthony Monday has exhibited in several Festivals such as Lagos Photo Festival: 
Mega City and the Non-City, The Nlele Institute (TNI): FotoParty Lagos, Silent 
Majority: Insiders Account, Abuja Photo Festival: Boundaries of Reason, 12th
Bamako Biennial of African Photography off Exhibition: Whither I Stand and the 
Trajectory of Vision, European Month of Photography: fuer Rotlicht Festival fuer 
Analoge Fotografie, Vienna, Kunst Haus Göttingen: 4000daily, Germany, Africa 
Foto Fair: Communities in Motion, Abidjan, Côte d’ivoire,`,

  `Worlds un/making, Iwalewahaus Research Centre FZA, University of Bayreuth, 
Germany etc. He has exhibited in several European cities like Barcelona, Bayreuth, 
Berlin and Vienna. Monday’s work has been referred to in several books and 
journals, including Africa under the Prism, Contemporary African Photography 
from Lagos Photo Festival, Hatje Cantz, Berlin, Germany, 6mois magazine, France, 
Lagos Photo Summer School, Camera Austria Nr. 132, Magazine, Graz, Austria, Le 
Journal de l’Afrique Magazine, France, Clam Substance magazine, France and 
Mediapolis Journal.`,

  `Anthony Monday lives and work in Lagos, Nigeria.`,
];

const About = () => {
  const imageUrl =
    "https://scontent-los4-1.cdninstagram.com/v/t39.30808-6/460923564_18472940341004066_5618925657620535340_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzQ2NDE3MDcwNTQwNzQ2NDE4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjl4ODIwLnNkci5DMyJ9&_nc_ohc=zZBZY9pQJ0QQ7kNvwG6l88B&_nc_oc=AdrHxg7VPFXOBES7jjap3kCVTJKgtFaICUC8Dl02nt65kJNNVMHw2EwoUC4cFYLtebg&_nc_ad=z-m&_nc_cid=1520&_nc_zt=23&_nc_ht=scontent-los4-1.cdninstagram.com&_nc_gid=BRG7bCuvO6C68a63_whAlA&_nc_ss=7a32e&oh=00_Af0QdH9eqMpTnmnZjKqe0b7zmiWRI7ygtcxtzoTAGEvJ6Q&oe=69E803C2";

  return (
    <>
      <SEO
        title="About Anthony Monday"
        description="Learn more about Anthony Monday, a visual storyteller exploring personal and societal themes through his photography."
      />

      <div
        className="about-page"
        style={{
          padding: "calc(var(--nav-height) + 64px) 48px 80px",
          background: "var(--bg)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionLabel label="Biography" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(35px, 6vw, 60px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "64px",
          }}
        >
          About
        </h1>

        <div
          className="about-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Portrait — sticky */}
          <div
            className="about-sidebar"
            style={{ position: "sticky", top: "96px", alignSelf: "start" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                background: "var(--surface)",
                marginBottom: "24px",
                overflow: "hidden",
                position: "relative",
              }}
              className="about-portrait"
            >
              {/* Replace with: <img src={photoUrl} alt="Anthony Monday" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} /> */}
              {/* Portrait */}
              <img
                src="/IMG_5752.JPG"
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
            </div>

            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text)",
                marginBottom: "4px",
              }}
            >
              Anthony Monday
            </p>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                marginBottom: "20px",
              }}
            >
              Visual Storyteller · Lagos, Nigeria
            </p>
          </div>

          {/* Bio text */}
          <div className="about-bio" style={{ maxWidth: "620px" }}>
            {/* Download CV Button */}
            <div style={{ marginBottom: "40px" }}>
              <a
                href="/Anthony-Monday-CV.pdf"
                download="Anthony-Monday-CV.pdf"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: "2px",
                  background: "var(--text)",
                  color: "var(--bg)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "opacity 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Download CV
              </a>
            </div>

            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: i === 0 ? "15px" : "13px",
                  lineHeight: i === 0 ? 1.9 : 2.1,
                  color: i === 0 ? "var(--text)" : "var(--muted)",
                  marginBottom: "24px",
                  fontFamily: i === 0 ? "var(--serif)" : "var(--sans)",
                  fontWeight: 300,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-layout {
            grid-template-columns: 240px 1fr !important;
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
          .about-portrait {
            max-width: 260px !important;
          }
          .about-page {
            padding: calc(var(--nav-height) + 40px) 24px 64px !important;
          }
        }
        @media (max-width: 480px) {
          .about-page {
            padding: calc(var(--nav-height) + 32px) 20px 48px !important;
          }
        }
      `}</style>
    </>
  );
};

export default About;
