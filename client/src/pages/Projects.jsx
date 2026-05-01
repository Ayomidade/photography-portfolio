/**
 * Projects
 *
 * Full projects page — all projects in the 2-column grid.
 * Page title + full ProjectsGrid with no limit.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import SEO from "@/components/SEO";

const Projects = () => {
  return (
    <>
<SEO title="Projects" description="Explore Anthony Monday's photography portfolio showcasing editorial, corporate, and documentary work." />
      
      <div
        className="section-header"
        style={{
          paddingTop: "calc(var(--nav-height) + 64px)",
          paddingBottom: 0,
          paddingLeft: "48px",
          paddingRight: "48px",
          background: "var(--bg)",
        }}
      >
        <SectionLabel label="All Work" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(35px, 6vw, 60px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          Projects
        </h1>
      </div>

      <ProjectsGrid showHeader={false} />
      <style>{`
        
        @media (max-width: 480px) {
          .section-header { padding-left: 20px !important; }
          .section-header { padding-top: calc(var(--nav-height) + 40px) !important; }
        }
      `}</style>
    </>
  );
};

export default Projects;
