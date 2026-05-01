/**
 * Images
 *
 * Pure standalone photo gallery — 3-column masonry-rhythm grid.
 * Fetches photos where collectionId is null (standalone=true).
 * No titles, no series — photography first.
 * First photo spans 2 columns as hero.
 * Hover reveals subtle overlay + category label.
 * Click opens Lightbox.
 */

import useFetch from "@/hooks/useFetch";
import useLightbox from "@/hooks/useLightbox";
import Lightbox from "@/components/gallery/Lightbox";
import SectionLabel from "@/components/ui/SectionLabel";
import SEO from "@/components/SEO";


const getAspectRatio = (i) => {
  if (i === 0) return "16/9";
  const cycle = (i - 1) % 3;
  if (cycle === 0) return "4/5";
  if (cycle === 1) return "1/1";
  return "3/4";
};

const Images = () => {
  const { data, loading, error } = useFetch("/api/photos/all?standalone=true");
  const photos = data?.data || [];
  const { isOpen, activeIndex, open, close, next, prev } = useLightbox();

  return (
    <>
      <SEO title="Images" description="A collection of standalone images by Anthony Monday." />
      {/* Page header */}
      <div
        className="section-header"
        style={{
          padding: "calc(var(--nav-height) + 64px) 48px 56px",
          background: "var(--bg)",
        }}
      >
        <SectionLabel label="Standalone Images" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(35px, 6vw, 60px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          Images
        </h1>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="Images-gallery"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: getAspectRatio(i),
                gridColumn: i === 0 ? "1 / 3" : "auto",
                background: "var(--surface)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
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
            textAlign: "center",
            padding: "80px 48px",
          }}
        >
          Failed to load Images.
        </p>
      )}

      {/* Gallery */}
      {!loading && !error && photos.length > 0 && (
        <div
          className="Images-gallery"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo._id}
              className="image-item"
              onClick={() => open(i)}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: getAspectRatio(i),
                gridColumn: i === 0 ? "1 / 3" : "auto",
                background: "var(--surface)",
              }}
            >
              <div
                className="image-bg"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: photo.imageUrl
                    ? `url(${photo.imageUrl})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform var(--transition-slow)",
                }}
              />
              <div
                className="image-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "18px",
                  transition: "background var(--transition)",
                }}
              >
                <span
                  className="image-label"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0)",
                    fontFamily: "var(--sans)",
                    transition: "color var(--transition)",
                  }}
                >
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && photos.length === 0 && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textAlign: "center",
            padding: "80px 48px",
          }}
        >
          No standalone image yet.
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
        .image-item:hover .image-bg { transform: scale(1.04); }
        .image-item:hover .image-overlay { background: rgba(0,0,0,0.28) !important; }
        .image-item:hover .image-label { color: rgba(255,255,255,0.85) !important; }

        @media (max-width: 1024px) {
          .Images-gallery {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .Images-gallery > div:first-child {
            grid-column: 1 / 3 !important;
          }
        }
        @media (max-width: 768px) {
          .Images-gallery {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .Images-gallery > div:first-child {
            grid-column: 1 / 3 !important;
          }
        }
        @media (max-width: 480px) {
          .Images-gallery {
            grid-template-columns: 1fr !important;
          }
          .Images-gallery > div:first-child {
            grid-column: auto !important;
          }
            .section-header { padding-left: 20px !important; }
          .section-header { padding-top: calc(var(--nav-height) + 40px) !important; }
        }
      `}</style>
    </>
  );
};

export default Images;

{
  /* <style>{`
        
        @media (max-width: 480px) {
          .section-header { padding-left: 20px !important; }
          .section-header { padding-top: calc(var(--nav-height) + 40px) !important; }
        }
      `}</style>*/
}
