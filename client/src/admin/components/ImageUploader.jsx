/**
 * ImageUploader
 *
 * Drag-and-drop + click-to-select file input.
 * Shows preview of selected image.
 * Calls onChange with the File object.
 *
 * Props:
 * - onChange(file): called with selected File
 * - preview: existing image URL for edit forms
 * - label: field label text
 */

import { useState, useRef } from "react";

const ImageUploader = ({
  onChange,
  preview: initialPreview = null,
  label = "Image",
}) => {
  const [preview, setPreview] = useState(initialPreview);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <label
        style={{
          display: "block",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.4)",
          marginBottom: "10px",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
        }}
      >
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${dragging ? "#1a1a1a" : "rgba(0,0,0,0.15)"}`,
          background: dragging ? "rgba(0,0,0,0.02)" : "#fafaf9",
          padding: "28px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              maxHeight: "180px",
              maxWidth: "100%",
              objectFit: "contain",
              display: "block",
              margin: "0 auto 16px",
            }}
          />
        )}
        <p
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.35)",
            letterSpacing: "0.08em",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
            marginBottom: "4px",
          }}
        >
          {preview ? "Click or drag to replace" : "Click or drag to upload"}
        </p>
        <p
          style={{
            fontSize: "9px",
            color: "rgba(0,0,0,0.2)",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          JPG, PNG or WEBP
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
