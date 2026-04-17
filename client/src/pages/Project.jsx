/**
 * Project
 *
 * Single project page — fullscreen photo slideshow.
 * Fetches the collection by slug from the URL param,
 * then fetches all photos belonging to that collection.
 * Renders photos in a fullscreen lightbox-style viewer.
 */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollectionBySlug } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import useLightbox from "@/hooks/useLightbox";
import Lightbox from "@/components/gallery/Lightbox";
import SectionLabel from "@/components/ui/SectionLabel";
import BtnGhost from "@/components/ui/BtnGhost";

const Project = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);

  // fetch collection by slug
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProjectLoading(true);
        const res = await getCollectionBySlug(slug);
        setProject(res.data);
      } catch (err) {
        setProjectError(err.message);
      } finally {
        setProjectLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  // fetch photos belonging to this collection
  const { data: photosData, loading: photosLoading } = useFetch(
    project ? `/api/photos?collectionId=${project._id}` : null,
  );

  const photos = photosData?.data || [];
  const { isOpen, activeIndex, open, close, next, prev } = useLightbox();

  if (projectLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--black)",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.2em",
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--black)",
          gap: "24px",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.2em",
          }}
        >
          Project not found.
        </p>
        <BtnGhost label="Back to Projects" to="/projects" />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          background: "var(--black)",
          padding: "var(--section-padding)",
          paddingTop: "160px",
        }}
      >
        {/* Back link */}
        <div style={{ marginBottom: "48px" }}>
          <BtnGhost label="All Projects" to="/projects" />
        </div>

        {/* Project header */}
        <SectionLabel
          label={`Project · ${String(project.photoCount ?? 0).padStart(2, "0")} Photographs`}
        />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(45px, 4vw, 40px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--text)",
            fontStyle: "italic",
            marginBottom: "16px",
          }}
        >
          {project.name}
        </h1>
        {project.description && (
          <p
            style={{
              fontSize: "13px",
              lineHeight: 2,
              color: "var(--muted)",
              maxWidth: "560px",
              marginBottom: "64px",
            }}
          >
            {project.description}
          </p>
        )}

        {/* Photo grid */}
        {photosLoading && (
          <div
            className="project-photos-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: "300px",
                  background: "var(--surface)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        )}

        {!photosLoading && photos.length > 0 && (
          <div
            className="project-photos-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3px",
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo._id}
                onClick={() => open(i)}
                style={{
                  height: "300px",
                  backgroundImage: `url(${photo.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  transition: "opacity var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              />
            ))}
          </div>
        )}

        {!photosLoading && photos.length === 0 && (
          <p
            style={{
              color: "var(--muted)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textAlign: "center",
              padding: "80px 0",
            }}
          >
            No photos in this project yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        photos={photos}
        activeIndex={activeIndex}
        isOpen={isOpen}
        onClose={close}
        onNext={next}
        onPrev={prev}
        onThumbClick={(i) => open(i)}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 1024px) {
          .project-photos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .project-photos-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default Project;
