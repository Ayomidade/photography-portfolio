/**
 * ProjectsGrid
 *
 * Two-column grid of project cards — matches Andrew Esiebo projects page exactly.
 * Used on both Home (with limit) and Projects page (no limit).
 *
 * Props:
 * - limit (number) — show only first N projects, used on Home
 * - showHeader (bool) — show section heading
 */

import useFetch from "@/hooks/useFetch";
import ProjectCard from "./ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import BtnGhost from "@/components/ui/BtnGhost";

const ProjectsGrid = ({ limit, showHeader = true }) => {
  const { data, loading, error } = useFetch("/api/collections");
  const all = data?.data || [];
  const projects = limit ? all.slice(0, limit) : all;

  return (
    <section
      style={{
        padding: "var(--section-padding)",
        background: "var(--bg)",
      }}
    >
      {showHeader && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <SectionLabel label="Selected Projects" />
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 300,
                color: "var(--text)",
              }}
            >
              Projects
            </h2>
          </div>
          {limit && <BtnGhost label="View all" to="/projects" />}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "4px",
          }}
        >
          {[...Array(limit || 6)].map((_, i) => (
            <div key={i}>
              <div
                style={{
                  aspectRatio: "4/3",
                  background: "var(--surface)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div style={{ padding: "14px 0 24px" }}>
                <div
                  style={{
                    height: "10px",
                    width: "40%",
                    background: "var(--surface)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            padding: "64px 0",
            textAlign: "center",
          }}
        >
          Failed to load projects.
        </p>
      )}

      {/* Grid */}
      {!loading && !error && projects.length > 0 && (
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "4px",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && projects.length === 0 && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            padding: "64px 0",
            textAlign: "center",
          }}
        >
          No projects yet.
        </p>
      )}

      <style>{`
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
