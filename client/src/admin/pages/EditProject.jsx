/**
 * EditProject
 *
 * Pre-fills form from existing collection.
 * Submits to PATCH /api/collections/:id.
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import ImageUploader from "@/admin/components/ImageUploader";
import MultiImageUploader from "@/admin/components/MultiImageUploader";
import BtnGhost from "@/components/ui/BtnGhost";
import useFetch from "@/hooks/useFetch";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    coverImage: "",
    coverPublicId: "",
  });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [photoErr, setPhotoErr] = useState(null);
  const [addedCount, setAddedCount] = useState(0);

  const {
    data: pd,
    loading: photosLoading,
    refetch: refetchPhotos,
  } = useFetch(id ? `/api/photos?collectionId=${id}` : null);
  const photos = pd?.data || [];

  useEffect(() => {
    fetch(`/api/collections/${id}`, { credentials: "include" })
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
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotos = async (uploaded) => {
    setSaving(true);
    setPhotoErr(null);
    try {
      const results = await Promise.all(
        uploaded.map(({ url }) =>
          fetch("/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: form.name,
              category: "Uncategorised",
              imageUrl: url,
              collectionId: id,
              featured: false,
            }),
          }).then((r) => r.json()),
        ),
      );
      const ok = results.filter((r) => r.success).length;
      setAddedCount((p) => p + ok);
      refetchPhotos();
      if (ok < uploaded.length)
        setPhotoErr(`${uploaded.length - ok} photo(s) failed.`);
    } catch (err) {
      setPhotoErr(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePhoto = async (pid) => {
    if (!window.confirm("Remove this photo?")) return;
    await fetch(`/api/photos/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });
    refetchPhotos();
  };

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
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* LEFT — form */}
        <div>
          <form onSubmit={handleSubmit}>
            <ImageUploader
              label="Cover Image"
              preview={form.coverImage}
              onUpload={({ imageUrl, imagePublicId }) =>
                setForm((p) => ({
                  ...p,
                  coverImage: imageUrl,
                  coverPublicId: imagePublicId,
                }))
              }
            />
            {["name", "slug"].map((name) => (
              <div key={name} style={{ marginBottom: "18px" }}>
                <LabelEl>{name === "name" ? "Project Name" : "Slug"}</LabelEl>
                <input
                  className="admin-input"
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div style={{ marginBottom: "22px" }}>
              <LabelEl>Description</LabelEl>
              <textarea
                className="admin-input admin-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            {error && (
              <div className="admin-error" style={{ marginBottom: "14px" }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary"
            >
              {loading ? "Saving..." : "Save Changes →"}
            </button>
          </form>
        </div>

        {/* RIGHT — photos */}
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
            {photos.length > 0 && (
              <span style={{ color: "#1a1a1a", marginLeft: "8px" }}>
                ({photos.length})
              </span>
            )}
          </p>

          {/* Photo grid */}
          {photosLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                marginBottom: "20px",
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
          ) : photos.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                marginBottom: "20px",
              }}
            >
              {photos.map((ph) => (
                <div
                  key={ph._id}
                  style={{ position: "relative", aspectRatio: "1" }}
                >
                  <img
                    src={ph.imageUrl}
                    alt={ph.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <button
                    onClick={() => deletePhoto(ph._id)}
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
                marginBottom: "20px",
                fontWeight: 300,
              }}
            >
              No photos yet.
            </p>
          )}

          <MultiImageUploader onUpload={handlePhotos} label="Add More Photos" />
          {saving && (
            <p
              style={{
                fontSize: "10px",
                color: "rgba(0,0,0,0.35)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Saving...
            </p>
          )}
          {photoErr && (
            <div className="admin-error" style={{ marginTop: "6px" }}>
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
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .edit-project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
};

export default EditProject;
