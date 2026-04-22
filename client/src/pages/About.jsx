/**
 * About
 *
 * Portrait left, long-form bio right — sticky sidebar on desktop.
 * Exact Andrew Esiebo about page structure and content.
 */

import SectionLabel from "@/components/ui/SectionLabel";

const paragraphs = [
  `Born in Lagos, Nigeria, Anthony Monday is an accomplished visual storyteller whose photography began with providing insight into the rapid urbanisation of Nigeria and Nigeria's vibrant cultural and heritage sites. Over time, he has expanded into multimedia and video reportage, tackling a whole range of complex subjects: sexuality, gender politics, football culture and popular culture, migration, religion, and spirituality.`,

  `He has been offered the Visa Pour La Création Prize by France's Institut Français as well as the Artistic Creation Prize by the Musée du Quai Branly. Several nominations that he has received in his career include the Prix Pictet, Magnum Emergency Fund, Sovereign African Art Prize, CAP Prize for Contemporary African Photography, and the Joop Stewart Masterclass.`,

  `In 2010, he was chosen for the Road to Twenty-Ten project as one of an All-Africa Dream Team of journalists and photographers to provide alternative storylines from the host country during South Africa's World Cup.`,

  `His work has been extensively exhibited around the world, including in Brazil at the São Paulo Biennial, in Senegal during the Dakárt Biennial, at the Biennale Cuvée in Austria, the Havana Biennale, the Arles Photo Festival, the Photoquai Biennial in France, the Guangzhou Triennial in China, the Chobi Mela V Photo Festival in Bangladesh, the Noorderlicht Photo Festival in the Netherlands, Bamako Encounters in Mali, and also at the Lagos Photo Festival in Nigeria.`,

  `His images have been published in titles including National Geographic, The New York Times, Courrier International, Le Point, CNN African Voices, the Washington Post, Financial Times, The Guardian, Marie Claire Italia, Le Monde Magazine, Time Out Nigeria, Mail & Guardian, Bloomberg, and Wallpaper, among many others.`,

  `He has collaborated with a number of local and international institutions while working on social issues. These notably include Kent University, King's College London, the University of Padova, The Photographers' Gallery in London, ActionAid, National Geographic, Women for Women International, MSH Nigeria, and World Press Photo.`,

  `Dedicated to sharing skills and experience, Anthony likes facilitating and leading photography training workshops and mentoring up-and-coming photographers. Notable engagements include serving as the Lead Instructor for Story Lab Training for Red Cross Communication Volunteers in Nigeria, as well as the Lead Instructor and Mentor for Naija in Light, a training project for photographers in Kano and Lagos.`,

  `Anthony Monday presently resides in Lagos, Nigeria but continues to work on visual projects worldwide, using his lens as a means to tell stories that matter.`,
];

const About = () => {
  const imageUrl =
    "https://scontent-los4-1.cdninstagram.com/v/t39.30808-6/460923564_18472940341004066_5618925657620535340_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzQ2NDE3MDcwNTQwNzQ2NDE4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjl4ODIwLnNkci5DMyJ9&_nc_ohc=zZBZY9pQJ0QQ7kNvwG6l88B&_nc_oc=AdrHxg7VPFXOBES7jjap3kCVTJKgtFaICUC8Dl02nt65kJNNVMHw2EwoUC4cFYLtebg&_nc_ad=z-m&_nc_cid=1520&_nc_zt=23&_nc_ht=scontent-los4-1.cdninstagram.com&_nc_gid=BRG7bCuvO6C68a63_whAlA&_nc_ss=7a32e&oh=00_Af0QdH9eqMpTnmnZjKqe0b7zmiWRI7ygtcxtzoTAGEvJ6Q&oe=69E803C2";

  return (
    <>
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
