/**
 * Lightbox
 *
 * Fullscreen photo viewer. Always dark background regardless of theme.
 * Arrow navigation, thumbnail strip, keyboard support (← → Esc).
 *
 * Props:
 * - photos, activeIndex, isOpen, onClose, onNext, onPrev, onThumbClick
 */

import { useEffect } from "react";

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

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") {
        onNext(total);
      } else if (e.key === "ArrowLeft") {
        onPrev(total);
      } else if (e.key === "Escape") {
        onClose();
      }
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
    transition: "border-color 0.25s, color 0.25s",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
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
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.35s ease",
        padding: "24px",
      }}
    >
      {/* Close */}
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
          fontFamily: "var(--sans)",
          transition: "color 0.25s",
          zIndex: 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
        }
      >
        ✕ &nbsp; Close
      </button>

      {/* Main image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "70vw",
          height: "65vh",
          marginBottom: "20px",
        }}
        className="lb-main"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: active?.imageUrl ? undefined : "#1a1a1a",
            backgroundImage: active?.imageUrl
              ? `url(${active.imageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev(total);
          }}
          style={{ ...navBtn, left: "-60px" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        {active?.title && (
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "4px",
            }}
          >
            {active.title}
          </p>
        )}
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {activeIndex + 1} / {total}
        </p>
      </div>

      {/* Thumbnails */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "90vw",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "8px",
        }}
      >
        {photos.map(
          (photo, i) => (
            (
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
                  // background: !photo.imageUrl ? "#222" : undefined,
                  cursor: "pointer",
                  opacity: i === activeIndex ? 1 : 0.35,
                  border:
                    i === activeIndex
                      ? "1px solid rgba(255,255,255,0.7)"
                      : "1px solid transparent",
                  transition: "opacity 0.25s, border-color 0.25s",
                  flexShrink: 0,
                }}
              />
            )
          ),
        )}
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
