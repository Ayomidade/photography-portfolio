/**
 * EditPhoto
 *
 * Owns the full update flow:
 *
 * 1. On mount: fetches existing photo, pre-populates form fields.
 *    ImageUploader receives existing Cloudinary URL as preview prop.
 *
 * 2. If admin selects a new image:
 *    - imageFile is set via ImageUploader onChange
 *    - preview shows new local blob URL immediately
 *
 * 3. On form submit:
 *    a. If imageFile exists (new image selected):
 *       - POST /api/upload/single  → Cloudinary → gets new { url, publicId }
 *    b. PATCH /api/photos/:id with all fields
 *       - If new image was uploaded: sends new imageUrl + imagePublicId
 *         (controller will delete old Cloudinary asset automatically)
 *       - If no new image: sends existing imageUrl + imagePublicId unchanged
 * 4. Navigates to /admin/photos on success
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminLayout from "@/admin/components/AdminLayout";
import ImageUploader from "@/admin/components/ImageUploader";
import BtnGhost from "@/components/ui/BtnGhost";
import useFetch from "@/hooks/useFetch";

const EditPhoto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cd } = useFetch("/api/collections");
  const collections = cd?.data || [];

  // Existing photo fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "", // existing Cloudinary URL — shown as ImageUploader preview
    imagePublicId: "", // existing public_id — sent if image not replaced
    collectionId: "",
    featured: false,
  });

  // New image selected by admin (null = no change)
  const [imageFile, setImageFile] = useState(null);

  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Load existing photo on mount
  useEffect(() => {
    fetch(`/api/photos/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const p = data.data || data;
        setForm({
          title: p.title || "",
          description: p.description || "",
          category: p.category || "",
          imageUrl: p.imageUrl || "",
          imagePublicId: p.imagePublicId || "",
          collectionId: p.collectionId || "",
          featured: p.featured || false,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      let imageUrl = form.imageUrl;
      let imagePublicId = form.imagePublicId;

      // ── Step 1: upload new image if admin selected one ──
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);

        const uploadRes = await fetch("/api/upload/single", {
          method: "POST",
          credentials: "include",
          body: fd,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.message || "Image upload failed.");

        // Use new Cloudinary values — controller will delete old asset
        imageUrl = uploadData.data.imageUrl;
        imagePublicId = uploadData.data.imagePublicId;
      }

      // ── Step 2: update photo document in MongoDB ──
      const saveRes = await useFetch(`/api/photos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          imageUrl,
          imagePublicId,
          collectionId: form.collectionId || null,
          featured: form.featured,
        }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok)
        throw new Error(saveData.message || "Failed to update photo.");

      toast.success("Photo updated successfully.");
      navigate("/admin/photos");
    } catch (err) {
      setError(err.message);
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

  if (fetching)
    return (
      <AdminLayout title="Edit Photo">
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
    <AdminLayout title="Edit Photo">
      <div style={{ maxWidth: "560px" }}>
        <div style={{ marginBottom: "24px" }}>
          <BtnGhost label="← Photos" to="/admin/photos" />
        </div>

        <form onSubmit={handleSubmit}>
          {/*
            ImageUploader:
            - preview={form.imageUrl} shows existing Cloudinary image on load
            - onChange sets imageFile — new upload only happens on submit
            - If admin doesn't touch this, imageFile stays null and existing URL is reused
          */}
          <ImageUploader
            label="Photo"
            preview={form.imageUrl}
            onChange={(file) => setImageFile(file)}
          />

          {imageFile && (
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
              New image selected — will upload on save.
            </p>
          )}

          {/* Title */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>Title</LabelEl>
            <input
              className="admin-input"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>Category</LabelEl>
            <input
              className="admin-input"
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>Description</LabelEl>
            <textarea
              className="admin-input admin-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Project */}
          <div style={{ marginBottom: "18px" }}>
            <LabelEl>Project (leave empty → Commissions)</LabelEl>
            <select
              className="admin-input admin-select"
              name="collectionId"
              value={form.collectionId}
              onChange={handleChange}
            >
              <option value="">No project — Commissions</option>
              {collections.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              style={{
                width: "14px",
                height: "14px",
                accentColor: "#1a1a1a",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="featured"
              style={{
                fontSize: "11px",
                color: "rgba(0,0,0,0.45)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Feature on homepage
            </label>
          </div>

          {error && (
            <div className="admin-error" style={{ marginBottom: "14px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="admin-btn-primary"
          >
            {uploading
              ? imageFile
                ? "Uploading & saving..."
                : "Saving..."
              : "Save Changes →"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditPhoto;
