/**
 * ProjectsGrid
 *
 * Renders all projects in a responsive CSS grid.
 * Used on both the Home page (preview) and the full Projects page.
 *
 * Props:
 * - `limit` (number, optional) — if passed, only renders that many projects.
 *   Used on Home to show a preview. Omit for the full Projects page.
 * - `showHeader` (boolean, default true) — toggle section header visibility.
 *   Home page shows it, Projects page has its own page header.
 */

import useFetch from "@/hooks/useFetch";
import SectionLabel from "@/components/ui/SectionLabel";
import BtnGhost from "@/components/ui/BtnGhost";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({ limit, showHeader = true }) => {
  const { data, loading, error } = useFetch("/api/collections");
  const allProjects = data?.data || [];
  const projects = limit ? allProjects.slice(0, limit) : allProjects;

  return (
    <section
      style={{
        background: "var(--deep)",
        padding: "var(--section-padding)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Section header */}
      {showHeader && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <SectionLabel label="Selected Projects" />
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              Recent{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Work
              </em>
            </h2>
          </div>
          {limit && <BtnGhost label="View all projects" to="/projects" />}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {[...Array(limit || 6)].map((_, i) => (
            <div
              key={i}
              style={{
                minHeight: "380px",
                background: "var(--surface)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textAlign: "center",
            padding: "80px 0",
          }}
        >
          Failed to load projects. Please try again later.
        </p>
      )}

      {/* Projects grid */}
      {!loading && !error && projects.length > 0 && (
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && projects.length === 0 && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textAlign: "center",
            padding: "80px 0",
          }}
        >
          No projects yet.
        </p>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsGrid;
