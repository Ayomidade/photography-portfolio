/**
 * PhotoCard
 *
 * A single photo item in the gallery grid.
 * Renders the photo as a background image with a hover overlay
 * that reveals the photo title and category.
 *
 * Props:
 * - `photo` (object, required) — { _id, title, category, imageUrl }
 * - `onClick` (function, required) — called when the card is clicked,
 *   triggers the lightbox to open at this photo's index
 * - `style` (object, optional) — additional styles for grid positioning
 *   e.g. { gridRow: '1 / 3' } for the large first card
 *
 * The overlay is hidden by default and fades in on hover.
 * On mobile, the overlay is always visible since there is no hover.
 */

import { useState } from "react";

const PhotoCard = ({ photo, onClick, style = {} }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
        cursor: "pointer",
        ...style,
      }}
    >
      {/* Photo background image */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${photo.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform var(--transition-slow)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8, 8, 8, 0.55)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          opacity: hovered ? 1 : 0,
          transition: "opacity var(--transition)",
        }}
        className="photo-overlay"
      >
        <h4
          style={{
            fontFamily: "var(--serif)",
            fontSize: "22px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--text)",
            marginBottom: "4px",
          }}
        >
          {photo.title}
        </h4>
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {photo.category}
        </span>
      </div>

      {/* Mobile — always show overlay */}
      <style>{`
        @media (max-width: 768px) {
          .photo-overlay {
            opacity: 1 !important;
            background: rgba(8, 8, 8, 0.35) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoCard;
