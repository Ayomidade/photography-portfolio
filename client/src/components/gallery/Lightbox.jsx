import { useEffect, useRef, useState } from "react";

const Lightbox = ({
  photos = [],
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onThumbClick,
}) => {
  const total = photos.length;
  const active = photos[activeIndex] || null;

  // ─── ZOOM STATE ─────────────────────────────
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") onNext(total);
      else if (e.key === "ArrowLeft") onPrev(total);
      else if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, total, onNext, onPrev, onClose]);

  if (!total) return null;

  const navBtn = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.6)",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.97)",
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      {/* CLOSE */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "28px",
          right: "36px",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕ Close
      </button>

      {/* ───── MAIN ZOOM VIEWER ───── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "70vw",
          height: "65vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: zoom > 1 ? "grab" : "zoom-in",
        }}
        onWheel={(e) => {
          // e.preventDefault();

          setZoom((prev) => {
            const next = prev + (e.deltaY < 0 ? 0.2 : -0.2);
            return Math.min(Math.max(next, 1), 3);
          });
        }}
        onDoubleClick={() => {
          setZoom(1);
          setPosition({ x: 0, y: 0 });
        }}
        onMouseDown={(e) => {
          if (zoom === 1) return;

          dragging.current = true;
          start.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          };
        }}
        onMouseMove={(e) => {
          if (!dragging.current) return;

          setPosition({
            x: e.clientX - start.current.x,
            y: e.clientY - start.current.y,
          });
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
      >
        <img
          src={active?.imageUrl}
          alt={active?.title || "photo"}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: dragging.current ? "none" : "transform 0.2s ease",
            maxWidth: "100%",
            maxHeight: "100%",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev(total);
          }}
          style={{ ...navBtn, left: "-60px" }}
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext(total);
          }}
          style={{ ...navBtn, right: "-60px" }}
        >
          ›
        </button>
      </div>

      {/* CAPTION */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: "center", marginTop: "16px" }}
      >
        <p
          style={{
            fontSize: "18px",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {active?.title}
        </p>

        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {activeIndex + 1} / {total}
        </p>

        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
          Scroll to zoom • Drag to pan • Double click to reset
        </p>
      </div>

      {/* THUMBNAILS */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "16px",
          overflowX: "auto",
          maxWidth: "90vw",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo._id || i}
            onClick={() => onThumbClick(i)}
            style={{
              width: "60px",
              height: "40px",
              backgroundImage: photo.imageUrl
                ? `url(${photo.imageUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              opacity: i === activeIndex ? 1 : 0.35,
              border:
                i === activeIndex
                  ? "1px solid rgba(255,255,255,0.7)"
                  : "1px solid transparent",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lb-main {
            width: 92vw !important;
            height: 50vh !important;
          }
          .lb-main button {
            width: 44px !important;
            height: 44px !important;
            background: rgba(0,0,0,0.6) !important;
          }
          .lb-main button:first-of-type { 
            left: 8px !important;
            right: auto !important;
          }
          .lb-main button:last-of-type { 
            right: 8px !important;
            left: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
