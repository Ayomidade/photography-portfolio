/**
 * NewProject
 *
 * Two-step flow:
 *
 * Step 1 — Create project:
 * - ImageUploader previews cover image, sets coverFile
 * - On submit:
 * a. POST /api/upload/single → Cloudinary → { url, publicId }
 * b. POST /api/collections → MongoDB with coverImage + coverPublicId
 *
 * Step 2 — Add photos to collection (optional):
 * - MultiImageUploader previews files, sets photoFiles[]
 * - On "Upload Photos":
 * a. POST /api/upload/multiple → Cloudinary → [{ url, publicId }]
 * b. POST /api/photos → one doc per image in MongoDB
 * - Admin can skip and add photos later via EditProject
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminLayout from "@/admin/components/AdminLayout";
import ImageUploader from "@/admin/components/ImageUploader";
import MultiImageUploader from "@/admin/components/MultiImageUploader";
import BtnGhost from "@/components/ui/BtnGhost";

const toSlug = (s) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const NewProject = () => {
  const navigate = useNavigate();

  // ── Step 1 state ──
  const [coverFile, setCoverFile] = useState(null); // File from ImageUploader
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── Step 2 state ──
  const [created, setCreated] = useState(null); // collection doc after step 1
  const [photoFiles, setPhotoFiles] = useState([]); // File[] from MultiImageUploader
  const [uploading, setUploading] = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const [photoError, setPhotoError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: value,
      ...(name === "name" && { slug: toSlug(value) }),
    }));
  };

  // ── Step 1: create project ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverFile) {
      toast.error("Please select a cover image.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // a. Upload cover to Cloudinary
      const fd = new FormData();
      fd.append("image", coverFile);

      const uploadRes = await fetch("/api/upload/single", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok)
        throw new Error(uploadData.message || "Cover upload failed.");

      const { imageUrl: coverImage, imagePublicId: coverPublicId } =
        uploadData.data;

      // b. Save collection to MongoDB
      const saveRes = await fetch("/api/collections", {
        method: "POST",
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
        throw new Error(saveData.message || "Failed to create project.");

      toast.success(`"${form.name}" created.`);
      setCreated(saveData.data || saveData);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step 2: upload photos to collection ──
  const handleUploadPhotos = async () => {
    if (!photoFiles.length || !created) return;

    setUploading(true);
    setPhotoError(null);

    const collectionId = created._id || created.id;

    try {

      // a. Upload all files to Cloudinary in one request
      const fd = new FormData();
      photoFiles.forEach((f) => fd.append("images", f));

      const uploadRes = await fetch("/api/upload/multiple", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok)
        throw new Error(uploadData.message || "Photo upload failed.");
      console.log(uploadData);
      const uploaded = uploadData.data; // [{ imageUrl, imagePublicId }]

      // b. Save one photo doc per uploaded image
      const results = await Promise.all(
        uploaded.map(({ imageUrl, imagePublicId }) =>
          fetch("/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: form.name,
              category: "Uncategorised",
              imageUrl: imageUrl,
              imagePublicId: imagePublicId,
              collectionId,
              featured: false,
            }),
          }).then((r) => r.json()),
        ),
      );

      const saved = results.filter((r) => r.success).length;
      const failed = results.length - saved;

      setAddedCount((p) => p + saved);
      setPhotoFiles([]); // clear queue after upload

      if (failed > 0) {
        setPhotoError(`${failed} photo(s) failed to save.`);
        toast.error(`${failed} photo(s) failed to save.`);
      } else {
        toast.success(`${saved} photo${saved !== 1 ? "s" : ""} added.`);
        setPhotoFiles([]); // clear queue after upload
      }
    } catch (err) {
      setPhotoError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
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

  // ════════════════════════════
  // Step 2 — add photos
  // ════════════════════════════
  if (created)
    return (
      <AdminLayout title="Add Photos">
        <div style={{ maxWidth: "680px" }}>
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "22px",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#1a1a1a",
                marginBottom: "8px",
              }}
            >
              "{form.name}" created.
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(0,0,0,0.38)",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Add photos to this project now, or skip and add them later from
              the Edit page.
            </p>
          </div>

          {/* Multi uploader — preview only */}
          <MultiImageUploader
            label="Project Photos"
            onChange={(files) => setPhotoFiles(files)}
          />

          {/* Upload button — only shown when files are queued */}
          {photoFiles.length > 0 && (
            <button
              type="button"
              onClick={handleUploadPhotos}
              disabled={uploading}
              className="admin-btn-primary"
              style={{ marginBottom: "16px" }}
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
                marginBottom: "12px",
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
                marginBottom: "12px",
              }}
            >
              {addedCount} photo{addedCount !== 1 ? "s" : ""} added to
              collection.
            </p>
          )}

          {photoError && (
            <div className="admin-error" style={{ marginBottom: "12px" }}>
              {photoError}
            </div>
          )}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="admin-btn-primary"
            >
              Done — View Projects
            </button>
            <BtnGhost
              label="Edit project"
              to={`/admin/projects/${created._id || created.id}/edit`}
            />
          </div>
        </div>
      </AdminLayout>
    );

  // ════════════════════════════
  // Step 1 — create project
  // ════════════════════════════
  return (
    <AdminLayout title="New Project">
      <div style={{ maxWidth: "560px" }}>
        <div style={{ marginBottom: "24px" }}>
          <BtnGhost label="← Projects" to="/admin/projects" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Cover image — preview only, upload happens on submit */}
          <ImageUploader
            label="Cover Image"
            onChange={(file) => setCoverFile(file)}
          />

          {/* Name */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>Project Name</LabelEl>
            <input
              className="admin-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="The Mist & the Pines"
              required
            />
          </div>

          {/* Slug */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>
              Slug
              <span
                style={{
                  textTransform: "none",
                  letterSpacing: 0,
                  fontWeight: 300,
                  opacity: 0.55,
                  fontSize: "8px",
                }}
              >
                {" "}
                — auto-generated from name
              </span>
            </LabelEl>
            <input
              className="admin-input"
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="the-mist-and-the-pines"
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "24px" }}>
            <LabelEl>Description (optional)</LabelEl>
            <textarea
              className="admin-input admin-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="A short description of this project..."
            />
          </div>

          {error && (
            <div className="admin-error" style={{ marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="admin-btn-primary"
          >
            {submitting ? "Creating..." : "Create Project →"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewProject;
