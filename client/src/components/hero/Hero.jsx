/**
 * Hero
 *
 * Fullscreen opening section — dark atmospheric background,
 * centered name + tagline, scroll hint at bottom.
 */

import HeroBg from "./HeroBg";
import HeroContent from "./HeroContent";
import ScrollHint from "@/components/ui/ScrollHint";

const Hero = () => {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <HeroBg />
      <HeroContent />
      <ScrollHint />
    </section>
  );
};

export default Hero;
