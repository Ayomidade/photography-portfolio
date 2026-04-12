/**
 * FeaturedGrid
 *
 * The asymmetric masonry photo grid on the homepage showing recent featured work.
 * Fetches featured photos from the API and renders them in a CSS Grid layout
 * where the first photo spans two rows for visual hierarchy.
 *
 * Layout (desktop):
 * ┌─────────────┬────────┬────────┐
 * │             │  [2]   │  [3]   │
 * │     [1]     ├────────┼────────┤
 * │             │  [4]   │  [5]   │
 * └─────────────┴────────┴────────┘
 *
 * Tablet (≤ 1024px):
 * ┌────────────────────┐
 * │        [1]         │
 * ├──────────┬─────────┤
 * │   [2]    │   [3]   │
 * ├──────────┼─────────┤
 * │   [4]    │   [5]   │
 * └──────────┴─────────┘
 *
 * Mobile (≤ 768px):
 * ┌──────────┐
 * │   [1]    │
 * ├──────────┤
 * │   [2]    │
 * ├──────────┤
 * │   [3]    │
 * ├──────────┤
 * │   [4]    │
 * ├──────────┤
 * │   [5]    │
 * └──────────┘
 *
 * Manages its own lightbox state via useLightbox.
 * Passes open() down to each PhotoCard as onClick.
 * Passes all lightbox controls down to Lightbox.
 *
 * Shows a loading skeleton while fetching and an error message if the
 * request fails — never leaves the user looking at a blank section.
 */

import useFetch from "@/hooks/useFetch";
import useLightbox from "@/hooks/useLightbox";
import PhotoCard from "./PhotoCard";
import Lightbox from "./Lightbox";
import SectionLabel from "@/components/ui/SectionLabel";
import BtnGhost from "@/components/ui/BtnGhost";

const FeaturedGrid = () => {
  const { data, loading, error } = useFetch("/api/photos?featured=true");
  const photos = data?.data || [];
  const { isOpen, activeIndex, open, close, next, prev } = useLightbox(
    photos.length,
  );
  // console.log(photos)

  return (
    <section
      style={{
        background: "var(--black)",
        padding: "var(--section-padding)",
      }}
    >
      {/* Section header */}
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
          <SectionLabel label="Selected Work" />
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(34px, 4vw, 50px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Recent{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Images
            </em>
          </h2>
        </div>
        <BtnGhost label="View all work" to="/portfolio" />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div
          className="featured-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr",
            gridTemplateRows: "320px 240px",
            gap: "3px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                gridRow: i === 0 ? "1 / 3" : "auto",
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
          Failed to load photos. Please try again later.
        </p>
      )}

      {/* Photo grid */}
      {!loading && !error && photos.length > 0 && (
        <div
          className="featured-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr",
            gridTemplateRows: "320px 320px",
            gap: "3px",
          }}
        >
          {photos.slice(0, 5).map((photo, i) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              onClick={() => open(i)}
              style={i === 0 ? { gridRow: "1 / 3" } : {}}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && photos.length === 0 && (
        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textAlign: "center",
            padding: "80px 0",
          }}
        >
          No featured photos yet.
        </p>
      )}

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

      {/* Responsive styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 260px 200px 200px !important;
          }
          .featured-grid > div:first-child {
            grid-row: 1 / 2 !important;
            grid-column: 1 / 3 !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(5, 220px) !important;
          }
          .featured-grid > div:first-child {
            grid-row: auto !important;
            grid-column: auto !important;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .featured-grid {
            grid-template-rows: repeat(5, 190px) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedGrid;
