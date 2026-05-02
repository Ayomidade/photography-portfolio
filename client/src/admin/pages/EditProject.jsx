/**
 * EditProject
 *
 * Two-panel layout (collapses to single column on tablet/mobile):
 *
 * LEFT — Edit project details:
 * - ImageUploader previews existing cover, sets coverFile if replaced
 * - On submit:
 * a. If coverFile set → POST /api/upload/single → new { url, publicId }
 * (controller deletes old Cloudinary asset automatically)
 * b. PATCH /api/collections/:id → MongoDB with updated fields
 *
 * RIGHT — Manage collection photos:
 * - Shows existing photos grid with per-photo delete
 * - MultiImageUploader previews new files, sets photoFiles[]
 * - "Upload Photos" button:
 * a. POST /api/upload/multiple → Cloudinary → [{ url, publicId }]
 * b. POST /api/photos → one doc per image in MongoDB
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminLayout from "@/admin/components/AdminLayout";
import ImageUploader from "@/admin/components/ImageUploader";
import MultiImageUploader from "@/admin/components/MultiImageUploader";
import BtnGhost from "@/components/ui/BtnGhost";
import useFetch from "@/hooks/useFetch";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ── Project form state ──
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    coverImage: "", // existing Cloudinary URL — shown as ImageUploader preview
    coverPublicId: "", // existing public_id — sent if cover not replaced
  });
  const [coverFile, setCoverFile] = useState(null); // File if admin picks new cover
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // ── Photos state ──
  const {
    data: pd,
    loading: photosLoading,
    refetch: refetchPhotos,
  } = useFetch(id ? `/api/collections/photos/${id}` : null);
  const existingPhotos = pd?.data || [];

  const [photoFiles, setPhotoFiles] = useState([]); // File[] from MultiImageUploader
  const [uploading, setUploading] = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const [photoError, setPhotoError] = useState(null);

  // Load existing project on mount
  useEffect(() => {
    fetch(
      `https://photography-portfolio-k7o4.onrender.com/api/collections/${id}`,
      { credentials: "include" },
    )
      .then((r) => r.json())
      .then((data) => {
        const p = data.data || data;
        setForm({
          name: p.name || "",
          slug: p.slug || "",
          description: p.description || "",
          coverImage: p.coverImage || "",
          coverPublicId: p.coverPublicId || "",
        });
      })
      .catch((err) => setFormError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ── Save project details ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      let coverImage = form.coverImage;
      let coverPublicId = form.coverPublicId;

      // Upload new cover only if admin selected a new file
      if (coverFile) {
        const fd = new FormData();
        fd.append("image", coverFile);

        const uploadRes = await fetch("https://photography-portfolio-k7o4.onrender.com/api/upload/single", {
          method: "POST",
          credentials: "include",
          body: fd,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.message || "Cover upload failed.");

        // Controller will delete old Cloudinary asset when it sees coverImage changed
        coverImage = uploadData.data.imageUrl;
        coverPublicId = uploadData.data.imagePublicId;
      }

      const saveRes = await fetch(`https://photography-portfolio-k7o4.onrender.com/api/collections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          coverImage,
          coverPublicId,
        }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok)
        throw new Error(saveData.message || "Failed to update project.");

      toast.success("Project updated.");
      navigate("/admin/projects");
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Upload new photos to collection ──
  const handleUploadPhotos = async () => {
    if (!photoFiles.length) return;

    setUploading(true);
    setPhotoError(null);

    try {
      // size validation handled in the image uploader
      // const maxSize = 9 * 1024 * 1024;

      // const validFiles = photoFiles.filter((f) => f.size <= maxSize);

      // if (validFiles.length === 0) {
      //   setPhotoError("All selected images exceed 9MB.");
      //   toast.error("All selected images exceed 9MB.");
      //   return;
      // }

      // if (validFiles.length !== photoFiles.length) {
      //   toast.error("Some images were skipped (over 9MB).");
      //   setPhotoError("Some images were skipped (over 9MB).")
      // }

      const fd = new FormData();
      photoFiles.forEach((f) => fd.append("images", f));

      const uploadRes = await fetch(
        "https://photography-portfolio-k7o4.onrender.com/api/upload/multiple",
        {
          method: "POST",
          credentials: "include",
          body: fd,
        },
      );
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok)
        throw new Error(uploadData.message || "Photo upload failed.");

      const uploaded = uploadData.data; // [{ url, publicId }]

      // b. Save one photo doc per uploaded image
      const results = await Promise.all(
        uploaded.map(({ imageUrl, imagePublicId }) =>
          fetch("https://photography-portfolio-k7o4.onrender.com/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: form.name,
              category: "Uncategorised",
              imageUrl: imageUrl,
              imagePublicId: imagePublicId,
              collectionId: id,
              featured: false,
            }),
          }).then((r) => r.json()),
        ),
      );

      const saved = results.filter((r) => r.success).length;
      const failed = results.length - saved;

      setAddedCount((p) => p + saved);
      setPhotoFiles([]); // clear queue
      refetchPhotos();

      if (failed > 0) {
        setPhotoError(`${failed} photo(s) failed to save.`);
        toast.error(`${failed} photo(s) failed.`);
      } else {
        toast.success(`${saved} photo${saved !== 1 ? "s" : ""} added.`);
      }
    } catch (err) {
      setPhotoError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ── Delete a single photo from collection ──
  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm("Remove this photo? This cannot be undone.")) return;
    try {
      const res = await fetch(`https://photography-portfolio-k7o4.onrender.com/api/photos/${photoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Photo removed.");
      refetchPhotos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const LabelEl = ({ children }) => (
    <label
      style={{
        display: "block",
        fontSize: "9px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.38)",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 400,
        marginBottom: "9px",
      }}
    >
      {children}
    </label>
  );

  if (fetching)
    return (
      <AdminLayout title="Edit Project">
        <p
          style={{
            color: "rgba(0,0,0,0.3)",
            fontSize: "12px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Loading...
        </p>
      </AdminLayout>
    );

  return (
    <AdminLayout title="Edit Project">
      <div style={{ marginBottom: "20px" }}>
        <BtnGhost label="← Projects" to="/admin/projects" />
      </div>

      <div
        className="edit-project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "480px 1fr",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* ════════════════════════════
            LEFT — project details form
            ════════════════════════════ */}
        <div>
          <form onSubmit={handleSubmit}>
            {/*
              ImageUploader:
              - preview={form.coverImage} shows existing Cloudinary cover
              - onChange sets coverFile — upload only happens on submit
              - If admin doesn't touch this, coverFile stays null and existing URL is reused
            */}
            <ImageUploader
              label="Cover Image"
              preview={form.coverImage}
              onChange={(file) => setCoverFile(file)}
            />

            {coverFile && (
              <p
                style={{
                  fontSize: "10px",
                  color: "rgba(0,0,0,0.4)",
                  fontFamily: "Montserrat, sans-serif",
                  marginTop: "-12px",
                  marginBottom: "16px",
                  letterSpacing: "0.04em",
                }}
              >
                New cover selected — will upload on save.
              </p>
            )}

            {/* Name */}
            <div style={{ marginBottom: "18px" }}>
              <LabelEl>Project Name</LabelEl>
              <input
                className="admin-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Slug */}
            <div style={{ marginBottom: "18px" }}>
              <LabelEl>Slug</LabelEl>
              <input
                className="admin-input"
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "24px" }}>
              <LabelEl>Description</LabelEl>
              <textarea
                className="admin-input admin-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {formError && (
              <div className="admin-error" style={{ marginBottom: "16px" }}>
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="admin-btn-primary"
            >
              {submitting
                ? coverFile
                  ? "Uploading & saving..."
                  : "Saving..."
                : "Save Changes →"}
            </button>
          </form>
        </div>

        {/* ════════════════════════════
            RIGHT — collection photos
            ════════════════════════════ */}
        <div>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.38)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              marginBottom: "14px",
            }}
          >
            Collection Photos
            {existingPhotos.length > 0 && (
              <span style={{ color: "#1a1a1a", marginLeft: "8px" }}>
                ({existingPhotos.length})
              </span>
            )}
          </p>

          {/* Existing photos grid */}
          {photosLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                marginBottom: "24px",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="admin-skeleton"
                  style={{ aspectRatio: "1", background: "rgba(0,0,0,0.06)" }}
                />
              ))}
            </div>
          ) : existingPhotos.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                marginBottom: "24px",
              }}
            >
              {existingPhotos.map((photo) => (
                <div
                  key={photo._id}
                  style={{ position: "relative", aspectRatio: "1" }}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(photo._id)}
                    title="Remove photo"
                    style={{
                      position: "absolute",
                      top: "3px",
                      right: "3px",
                      width: "20px",
                      height: "20px",
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
          ) : (
            <p
              style={{
                fontSize: "11px",
                color: "rgba(0,0,0,0.28)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                marginBottom: "24px",
                letterSpacing: "0.04em",
              }}
            >
              No photos in this collection yet.
            </p>
          )}

          {/* Add more photos — preview only */}
          <MultiImageUploader
            label="Add More Photos"
            onChange={(files) => setPhotoFiles(files)}
          />

          {/* Upload button — only shown when files are queued */}
          {photoFiles.length > 0 && (
            <button
              type="button"
              onClick={handleUploadPhotos}
              disabled={uploading}
              className="admin-btn-primary"
              style={{ marginBottom: "12px" }}
            >
              {uploading
                ? "Uploading..."
                : `Upload ${photoFiles.length} Photo${photoFiles.length !== 1 ? "s" : ""} →`}
            </button>
          )}

          {/* Progress feedback */}
          {uploading && (
            <p
              style={{
                fontSize: "10px",
                color: "rgba(0,0,0,0.38)",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "8px",
              }}
            >
              Uploading to Cloudinary and saving to database...
            </p>
          )}

          {addedCount > 0 && !uploading && (
            <p
              style={{
                fontSize: "10px",
                color: "#27ae60",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "8px",
              }}
            >
              {addedCount} photo{addedCount !== 1 ? "s" : ""} added to
              collection.
            </p>
          )}

          {photoError && (
            <div className="admin-error" style={{ marginTop: "4px" }}>
              {photoError}
            </div>
          )}
        </div>
      </div>

      {/* Responsive — collapse to single column on tablet */}
      <style>{`
        @media (max-width: 1100px) {
          .edit-project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default EditProject;
