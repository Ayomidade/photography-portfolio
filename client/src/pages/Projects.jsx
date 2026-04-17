/**
 * Projects
 *
 * Full projects page — all projects in the grid.
 * No limit passed so all projects render.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
// import ProjectsGrid from "../components/projects/ProjectsGrid"

const Projects = () => {
  return (
    <>
      {/* Page header */}
      <div
        style={{
          paddingTop: "160px",
          paddingBottom: "0",
          paddingLeft: "48px",
          paddingRight: "48px",
          background: "var(--black)",
        }}
      >
        <SectionLabel label="All Work" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(45px, 4vw, 40px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: "10px",
          }}
        >
          Projects
        </h1>
      </div>

      <ProjectsGrid showHeader={false} />
    </>
  );
};

export default Projects;
