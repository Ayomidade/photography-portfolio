/**
 * AboutImage
 *
 * Left panel of the AboutStrip section.
 * Atmospheric CSS art panel — dark gradient with a subtle
 * photographer silhouette suggestion.
 * Purely decorative, no props, no data.
 */
// import anthonyPhoto from '@/assets/hero.jpg'

// import "/IMG_5752.JPG";

const AboutImage = () => {
    const imageUrl =
      "https://scontent-los4-1.cdninstagram.com/v/t39.30808-6/460923564_18472940341004066_5618925657620535340_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzQ2NDE3MDcwNTQwNzQ2NDE4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjl4ODIwLnNkci5DMyJ9&_nc_ohc=zZBZY9pQJ0QQ7kNvwG6l88B&_nc_oc=AdrHxg7VPFXOBES7jjap3kCVTJKgtFaICUC8Dl02nt65kJNNVMHw2EwoUC4cFYLtebg&_nc_ad=z-m&_nc_cid=1520&_nc_zt=23&_nc_ht=scontent-los4-1.cdninstagram.com&_nc_gid=BRG7bCuvO6C68a63_whAlA&_nc_ss=7a32e&oh=00_Af0QdH9eqMpTnmnZjKqe0b7zmiWRI7ygtcxtzoTAGEvJ6Q&oe=69E803C2";
  return (
    <div
      aria-hidden="true"
      className="about-image"
      style={{
        minHeight: "600px",
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      {/* Actual photo */}
      <img
        src="/IMG_5752.JPG"
        alt="Anthony Monday"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Overlay — keeps the dark gradient blend into content panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, transparent 60%, var(--black) 100%)",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .about-image {
            min-height: 380px !important;
          }
          .about-image > div:last-child {
            background: linear-gradient(to bottom, transparent 50%, var(--black) 100%) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutImage;
