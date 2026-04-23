/**
 * NewPhoto
 *
 * Upload a new photo.
 * Assigns to a project (optional) or leaves standalone for Commissions.
 * Submits to POST /api/photos.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import BtnGhost from "@/components/ui/BtnGhost";
import useFetch from "@/hooks/useFetch";

const NewPhoto = () => {
  const navigate = useNavigate();
  const { data: collectionsData } = useFetch("/api/collections");
  const collections = collectionsData?.data || [];

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    collectionId: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          collectionId: form.collectionId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/admin/photos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "11px 14px",
    color: "#1a1a1a",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.4)",
    marginBottom: "10px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 400,
  };

  return (
    <AdminLayout title="Upload Photo">
      <div style={{ maxWidth: "600px" }}>
        <div style={{ marginBottom: "28px" }}>
          <BtnGhost label="Back to Photos" to="/admin/photos" />
        </div>

        <form onSubmit={handleSubmit}>
          {[
            {
              name: "title",
              label: "Title",
              placeholder: "Into the Quiet Forest",
              type: "text",
              required: true,
            },
            {
              name: "category",
              label: "Category",
              placeholder: "Landscape · Portrait · Documentary",
              type: "text",
              required: true,
            },
            {
              name: "imageUrl",
              label: "Image URL",
              placeholder: "https://...",
              type: "text",
              required: true,
            },
          ].map(({ name, label, placeholder, type, required }) => (
            <div key={name} style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>{label}</label>
              <input
                style={inputStyle}
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
              />
            </div>
          ))}

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Description (optional)</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description..."
              onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>
              Project (leave empty for Commissions)
            </label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              name="collectionId"
              value={form.collectionId}
              onChange={handleChange}
              onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
            >
              <option value="">No project — Commissions gallery</option>
              {collections.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              type="checkbox"
              name="featured"
              id="featured"
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
                color: "rgba(0,0,0,0.5)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              Feature on homepage
            </label>
          </div>

          {error && (
            <p
              style={{
                fontSize: "11px",
                color: "#c0392b",
                marginBottom: "16px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#fff",
              background: loading ? "rgba(0,0,0,0.25)" : "#1a1a1a",
              border: "none",
              padding: "13px 36px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.opacity = "0.75";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {loading ? "Uploading..." : "Upload Photo →"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewPhoto;
