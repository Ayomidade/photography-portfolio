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
import BtnGhost from "@/components/ui/BtnGhost";

const NewProject = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && {
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate("/admin/projects");
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
    <AdminLayout title="New Project">
      <div style={{ maxWidth: "600px" }}>
        <div style={{ marginBottom: "28px" }}>
          <BtnGhost label="Back to Projects" to="/admin/projects" />
        </div>

        <form onSubmit={handleSubmit}>
          {[
            {
              name: "name",
              label: "Project Name",
              placeholder: "The Mist & the Pines",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              label: "Slug",
              placeholder: "the-mist-and-the-pines",
              type: "text",
              required: true,
            },
            {
              name: "coverImage",
              label: "Cover Image URL",
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
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="A brief description of this project..."
              onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
            />
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
            {loading ? "Creating..." : "Create Project →"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewProject;
