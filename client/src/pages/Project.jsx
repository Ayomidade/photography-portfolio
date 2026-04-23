/**
 * Project
 *
 * Single project — 3-column photo grid + lightbox.
 * Fetches collection by slug then all photos in that collection.
 */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollectionBySlug } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import useLightbox from "@/hooks/useLightbox";
import PhotoCard from "@/components/gallery/PhotoCard";
import Lightbox from "@/components/gallery/Lightbox";
import BtnGhost from "@/components/ui/BtnGhost";
import SectionLabel from "@/components/ui/SectionLabel";

const Project = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setProjectLoading(true);
        const res = await getCollectionBySlug(slug);
        setProject(res.data || res);
      } catch (err) {
        setProjectError(err.message);
      } finally {
        setProjectLoading(false);
      }
    };
    load();
  }, [slug]);

  const { data: photosData, loading: photosLoading } = useFetch(
    project ? `/api/photos?collectionId=${project._id}` : null,
  );
  const photos = photosData?.data || [];
  const { isOpen, activeIndex, open, close, next, prev } = useLightbox(
    photos.length,
  );

  if (projectLoading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            fontSize: "11px",
            letterSpacing: "0.25em",
          }}
        >
          Loading...
        </p>
      </div>
    );

  if (projectError || !project)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          background: "var(--bg)",
        }}
      >
        <p style={{ color: "var(--muted)", fontSize: "12px" }}>
          Project not found.
        </p>
        <BtnGhost label="Back to Projects" to="/projects" />
      </div>
    );

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "calc(var(--nav-height) + 64px) 48px 48px",
          background: "var(--bg)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <BtnGhost label="All Projects" to="/projects" />
        </div>

        <SectionLabel label={`${project.photoCount ?? 0} Photographs`} />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 300,
            color: "var(--text)",
            fontStyle: "italic",
            marginBottom: "14px",
            lineHeight: 1.05,
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
              maxWidth: "540px",
            }}
          >
            {project.description}
          </p>
        )}
      </div>

      {/* Photo grid */}
      {photosLoading && (
        <div
          className="project-grid"
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
                aspectRatio: "4/3",
                background: "var(--surface)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      )}

      {!photosLoading && photos.length > 0 && (
        <div
          className="project-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {photos.map((photo, i) => (
            <PhotoCard key={photo._id} photo={photo} onClick={() => open(i)} />
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
            padding: "80px 48px",
          }}
        >
          No photos in this project yet.
        </p>
      )}

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
        @media (max-width: 1024px) {
          .project-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default Project;
