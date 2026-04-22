/**
 * Home
 *
 * Hero → Projects preview (latest 6) → Contact section
 * Matches Andrew Esiebo homepage structure.
 */

import Hero from "@/components/hero/Hero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ContactSection from "@/components/contact/ContactSection";

const Home = () => {
  return (
    <>
      <Hero />
      {/* <ProjectsGrid limit={6} /> */}
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
