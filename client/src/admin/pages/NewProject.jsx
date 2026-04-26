/**
 * NewProject
 *
 * Create a new project (collection).
 * Submits to POST /api/collections.
 * Auto-generates slug from name.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    coverImage: "",
    coverPublicId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [saving, setSaving] = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const [photoErr, setPhotoErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: value,
      ...(name === "name" && { slug: toSlug(value) }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coverImage) return setError("Please upload a cover image.");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCreated(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotos = async (uploaded) => {
    if (!created) return;
    setSaving(true);
    setPhotoErr(null);
    const id = created._id || created.id;
    try {
      const results = await Promise.all(
        uploaded.map(({ url, publicId }) =>
          fetch("/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: form.name,
              category: "Uncategorised",
              imageUrl: url,
              imagePublicId: publicId, 
              collectionId: id,
              featured: false,
            }),
          }).then((r) => r.json()),
        ),
      );
      const ok = results.filter((r) => r.success).length;
      setAddedCount((p) => p + ok);
      if (ok < uploaded.length)
        setPhotoErr(`${uploaded.length - ok} photo(s) failed to save.`);
    } catch (err) {
      setPhotoErr(err.message);
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ name, label, placeholder, required, hint }) => (
    <div style={{ marginBottom: "20px" }}>
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
        {label}
        {hint && (
          <span
            style={{
              textTransform: "none",
              letterSpacing: 0,
              opacity: 0.55,
              fontSize: "8px",
              fontWeight: 300,
            }}
          >
            {" "}
            — {hint}
          </span>
        )}
      </label>
      <input
        className="admin-input"
        type="text"
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );

  /* ── Step 2: Add photos ── */
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
              Add photos to this project now, or skip and add them later.
            </p>
          </div>

          <MultiImageUploader onUpload={handlePhotos} />

          {saving && (
            <p
              style={{
                fontSize: "10px",
                color: "rgba(0,0,0,0.38)",
                fontFamily: "Montserrat, sans-serif",
                marginTop: "6px",
              }}
            >
              Saving...
            </p>
          )}
          {photoErr && (
            <div className="admin-error" style={{ marginTop: "8px" }}>
              {photoErr}
            </div>
          )}
          {addedCount > 0 && !saving && (
            <p
              style={{
                fontSize: "10px",
                color: "#27ae60",
                fontFamily: "Montserrat, sans-serif",
                marginTop: "6px",
              }}
            >
              {addedCount} photo{addedCount !== 1 ? "s" : ""} added.
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "28px",
              flexWrap: "wrap",
            }}
          >
            <button
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

  /* ── Step 1: Create project ── */
  return (
    <AdminLayout title="New Project">
      <div style={{ maxWidth: "560px" }}>
        <div style={{ marginBottom: "24px" }}>
          <BtnGhost label="← Projects" to="/admin/projects" />
        </div>

        <form onSubmit={handleSubmit}>
          <ImageUploader
            label="Cover Image"
            onUpload={({ imageUrl, imagePublicId }) =>
              setForm((p) => ({
                ...p,
                coverImage: imageUrl,
                coverPublicId: imagePublicId,
              }))
            }
          />
          <Field
            name="name"
            label="Project Name"
            placeholder="The Mist & the Pines"
            required
          />
          <Field
            name="slug"
            label="Slug"
            placeholder="the-mist-and-the-pines"
            required
            hint="auto-generated from name"
          />
          <div style={{ marginBottom: "24px" }}>
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
              Description
            </label>
            <textarea
              className="admin-input admin-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="A short description..."
            />
          </div>

          {error && (
            <div className="admin-error" style={{ marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary"
          >
            {loading ? "Creating..." : "Create Project →"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewProject;
