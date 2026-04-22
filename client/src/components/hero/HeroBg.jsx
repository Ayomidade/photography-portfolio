/**
 * HeroBg
 *
 * Fullscreen atmospheric CSS art background.
 * Deep dark gradient — photography-first, cinematic.
 * Simulates a moody landscape with light leak and depth layers.
 */

const HeroBg = () => {
  const imageUrl =
    "https://scontent-los4-1.cdninstagram.com/v/t39.30808-6/460923564_18472940341004066_5618925657620535340_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzQ2NDE3MDcwNTQwNzQ2NDE4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjl4ODIwLnNkci5DMyJ9&_nc_ohc=zZBZY9pQJ0QQ7kNvwG6l88B&_nc_oc=AdrHxg7VPFXOBES7jjap3kCVTJKgtFaICUC8Dl02nt65kJNNVMHw2EwoUC4cFYLtebg&_nc_ad=z-m&_nc_cid=1520&_nc_zt=23&_nc_ht=scontent-los4-1.cdninstagram.com&_nc_gid=BRG7bCuvO6C68a63_whAlA&_nc_ss=7a32e&oh=00_Af0QdH9eqMpTnmnZjKqe0b7zmiWRI7ygtcxtzoTAGEvJ6Q&oe=69E803C2";
  return (
    <div
      aria-hidden="true"
      className="hero-bg"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.63)",
        }}
      />

      {/* Light leak */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "18%",
          right: "42%",
          height: "55%",
          background:
            "linear-gradient(to bottom, rgba(200,169,110,0.06), transparent)",
          transform: "skewX(-4deg)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom,
          rgba(0,0,0,0.12) 0%,
          rgba(0,0,0,0) 30%,
          rgba(0,0,0,0) 55%,
          rgba(0,0,0,0.55) 100%)`,
        }}
      />
    </div>
  );
};

export default HeroBg;
