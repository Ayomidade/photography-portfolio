/**
 * Lightbox
 *
 * Fullscreen photo viewer that opens when a PhotoCard is clicked.
 * Renders the active photo full screen with:
 *
 * - Left/right arrow buttons for navigation between photos
 * - Caption showing the photo title and category below the image
 * - Thumbnail strip at the bottom for quick navigation
 * - Close button in the top right corner
 * - Click outside the image to close
 *
 * Props:
 * - `photos` (array, required) — full array of photo objects
 * - `activeIndex` (number, required) — index of the currently shown photo
 * - `isOpen` (boolean, required) — whether the lightbox is visible
 * - `onClose` (function, required) — closes the lightbox
 * - `onNext` (function, required) — advances to next photo
 * - `onPrev` (function, required) — goes back to previous photo
 * - `onThumbClick` (function, required) — jumps to a specific photo by index
 *
 * Arrow key navigation and Escape key are handled in useLightbox.
 */

const Lightbox = ({
  photos,
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onThumbClick,
}) => {
  if (!photos || photos.length === 0) return null;

  const active = photos[activeIndex];
  const total = photos.length;

    // console.log(active);
    // console.log(photos);
  return (
    <div
      aria-modal="true"
      role="dialog"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.97)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.4s ease",
        padding: "24px",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "32px",
          right: "40px",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "color var(--transition)",
          zIndex: 201,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        ✕ &nbsp; Close
      </button>

      {/* Main image — stop click propagation so clicking image doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "70vw",
          height: "65vh",
          marginBottom: "24px",
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${active.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Prev arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev(total);
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "-60px",
            transform: "translateY(-50%)",
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text)",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
            transition:
              "border-color var(--transition), color var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text)";
          }}
        >
          ‹
        </button>

        {/* Next arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext(total);
          }}
          style={{
            position: "absolute",
            top: "50%",
            right: "-60px",
            transform: "translateY(-50%)",
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text)",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
            transition:
              "border-color var(--transition), color var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text)";
          }}
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "20px",
            fontStyle: "italic",
            color: "var(--text)",
            marginBottom: "6px",
          }}
        >
          {active.title}
        </p>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {active.category}
        </p>
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo._id}
            onClick={() => onThumbClick(i)}
            style={{
              width: "72px",
              height: "48px",
              backgroundImage: `url(${photo.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              opacity: i === activeIndex ? 1 : 0.4,
              border:
                i === activeIndex
                  ? "1px solid var(--accent)"
                  : "1px solid transparent",
              transition:
                "opacity var(--transition), border-color var(--transition)",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .lightbox-image { width: 92vw !important; height: 50vh !important; }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
