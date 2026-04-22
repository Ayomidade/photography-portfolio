/**
 * ProjectCard
 *
 * Single project card — cover image + title below.
 * Exact Andrew Esiebo style: image takes full width,
 * title in small uppercase below the image.
 * Hover: image scales slightly, title fades.
 */

import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index }) => {
  const { name, slug, coverImage, photoCount } = project;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {/* Cover image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          overflow: "hidden",
          background: "var(--surface)",
          position: "relative",
        }}
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform var(--transition-slow)",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--surface)",
            }}
          />
        )}
      </div>

      {/* Title below */}
      <div style={{ padding: "14px 0 24px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: hovered ? "var(--muted)" : "var(--text)",
            transition: "color var(--transition)",
            fontFamily: "var(--sans)",
          }}
        >
          {name}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
