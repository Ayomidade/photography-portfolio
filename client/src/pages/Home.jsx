/**
 * Home
 *
 * Homepage assembling all sections in order:
 * Hero → ProjectsGrid (preview) → AboutStrip → ContactSection
 */

import Hero from "@/components/hero/Hero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import AboutStrip from "@/components/about/AboutStrip";
import ContactSection from "@/components/contact/ContactSection";

const Home = () => {
  return (
    <>
      <Hero />
      <ProjectsGrid limit={3} />
      <AboutStrip />
      <ContactSection />
    </>
  );
};

export default Home;
