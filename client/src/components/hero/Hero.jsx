/**
 * Hero
 *
 * The fullscreen opening section of the homepage.
 * Composes three layers stacked on top of each other:
 *
 * 1. HeroBg — the atmospheric CSS art background (position: absolute, inset: 0)
 * 2. HeroContent — the text and CTAs anchored to the bottom left
 * 3. ScrollHint — the animated scroll indicator anchored to the bottom right
 *
 * `position: relative` on the section creates the stacking context
 * that HeroBg's `position: absolute` is relative to.
 *
 * `height: 100vh` makes the section fill the full viewport height
 * so the content sits at the very bottom and the background fills the frame.
 *
 * No props needed — fully self-contained.
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
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "var(--black)",
      }}
    >
      {/* Atmospheric CSS art background */}
      <HeroBg />

      {/* Text content and CTAs */}
      <HeroContent />

      {/* Scroll indicator — bottom right */}
      <ScrollHint />
    </section>
  );
};

export default Hero;
