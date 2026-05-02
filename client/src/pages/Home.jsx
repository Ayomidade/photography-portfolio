/**
 * Home
 *
 * Hero → Projects preview (latest 6) → Contact section
 * Matches Andrew Esiebo homepage structure.
 */

import Hero from "@/components/hero/Hero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ContactSection from "@/components/contact/ContactSection";
import SEO from "@/components/SEO";
import PageMeta from "@/components/ui/PageMeta";
import { SITE } from "@/utils/seo";

const Home = () => {
  return (
    <>
      <PageMeta
        title="Visual Storyteller"
        description="Anthony Monday is an award-winning visual storyteller based in Lagos, Nigeria. Available for commissions and artistic collaborations worldwide."
        url={SITE.url}
      />
      <Hero />
      {/* <ProjectsGrid limit={6} /> */}
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
