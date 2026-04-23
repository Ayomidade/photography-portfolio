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
        aspectRatio: "4/3",
        ...style,
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: photo?.imageUrl ? `url(${photo.imageUrl})` : "none",
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
          background: hovered ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0)",
          transition: "background var(--transition)",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default PhotoCard;
