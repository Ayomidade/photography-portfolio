/**
 * MultiImageUploader
 *
 * Preview-only component — no upload logic here.
 * Accepts multiple files via click or drag-and-drop,
 * shows a preview grid with per-file remove,
 * then calls onChange(files) with the File array
 * so the parent page owns the upload.
 *
 * Props:
 * - onChange(files) — called with File[] whenever the queue changes
 * - maxFiles        — max number of files (default 20)
 * - label           — field label text
 */

import { useState, useRef } from "react";

const MultiImageUploader = ({
  onChange,
  maxFiles = 20,
  label = "Add Photos",
}) => {
  const [queue, setQueue] = useState([]); // { id, file, localUrl }
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const notify = (nextQueue) => {
    onChange(nextQueue.map((i) => i.file));
  };

  const enqueue = (incoming) => {
    const valid = Array.from(incoming)
      .filter((f) => f.type.startsWith("image/"))
      .filter((f) => f.size <= 15 * 1024 * 1024)
      .slice(0, maxFiles - queue.length);

    if (!valid.length) {
      setError(
        "No valid images selected. Ensure files are JPG/PNG/WEBP under 15 MB.",
      );
      return;
    }

    const newItems = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      localUrl: URL.createObjectURL(file),
    }));

    setQueue((prev) => {
      const next = [...prev, ...newItems];
      notify(next);
      return next;
    });

    setError(null);
  };

  const remove = (id) => {
    setQueue((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.localUrl);
      const next = prev.filter((i) => i.id !== id);
      notify(next);
      return next;
    });
  };

  const clear = () => {
    queue.forEach((i) => URL.revokeObjectURL(i.localUrl));
    setQueue([]);
    onChange([]);
  };

  return (
    <div style={{ marginBottom: "22px" }}>
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.38)",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          marginBottom: "10px",
        }}
      >
        {label}
      </p>

      {/* Drop zone */}
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          enqueue(e.dataTransfer.files);
        }}
        style={{
          border: `1px dashed ${dragging ? "#1a1a1a" : "rgba(0,0,0,0.14)"}`,
          background: dragging ? "rgba(0,0,0,0.018)" : "#fafaf8",
          padding: "24px 20px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
          marginBottom: queue.length ? "14px" : 0,
        }}
      >
        <p
          style={{
            fontSize: "22px",
            opacity: 0.18,
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          ↑
        </p>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.32)",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.06em",
            marginBottom: "4px",
          }}
        >
          Click or drag multiple images
        </p>
        <p
          style={{
            fontSize: "9px",
            color: "rgba(0,0,0,0.18)",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Up to {maxFiles} files · JPG PNG WEBP · 15 MB each
        </p>
      </div>

      {/* Preview grid */}
      {queue.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
              gap: "4px",
              marginBottom: "12px",
            }}
          >
            {queue.map(({ id, localUrl, file }) => (
              <div
                key={id}
                style={{ position: "relative", aspectRatio: "1/1" }}
              >
                <img
                  src={localUrl}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={() => remove(id)}
                  aria-label="Remove"
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    width: "18px",
                    height: "18px",
                    background: "rgba(0,0,0,0.65)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Queue info + clear */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "rgba(0,0,0,0.35)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {queue.length} / {maxFiles} selected
            </span>
            <button
              type="button"
              onClick={clear}
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat, sans-serif",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.3)")
              }
            >
              Clear all
            </button>
          </div>
        </>
      )}

      {error && (
        <p
          style={{
            fontSize: "10px",
            color: "#c0392b",
            marginTop: "8px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {error}
        </p>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => enqueue(e.target.files)}
        hidden
      />
    </div>
  );
};

export default MultiImageUploader;
