/**
 * AdminPhotos
 *
 * Lists all photos with edit and delete.
 * Shows thumbnail, title, category, featured status.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import AdminTable from "@/admin/components/AdminTable";
import useFetch from "@/hooks/useFetch";

const columns = [
  {
    key: "imageUrl",
    label: "Image",
    render: (val) =>
      val ? (
        <img
          src={val}
          alt=""
          style={{
            width: "52px",
            height: "36px",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "52px",
            height: "36px",
            background: "rgba(0,0,0,0.06)",
          }}
        />
      ),
  },
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  {
    key: "featured",
    label: "Featured",
    render: (val) => (
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: val ? "#1a1a1a" : "rgba(0,0,0,0.25)",
          fontWeight: val ? 400 : 300,
        }}
      >
        {val ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "collectionId",
    label: "Type",
    render: (val) => (
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.35)",
        }}
      >
        {val ? "Project" : "Commission"}
      </span>
    ),
  },
];

const AdminPhotos = () => {
  const { data, loading, error, refetch } = useFetch("/api/photos/all?standalone=true");
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(null);

  const photos = data?.data || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/photos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      refetch();
    } catch (err) {
      console.error("Delete failed:", err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Photos">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.35)",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
          }}
        >
          {photos.length} photo{photos.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => navigate("/admin/photos/new")}
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#1a1a1a",
            border: "none",
            padding: "11px 24px",
            cursor: "pointer",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Upload Photo
        </button>
      </div>

      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px", marginBottom: "16px" }}>
          Failed to load photos.
        </p>
      )}

      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
        <AdminTable
          columns={columns}
          rows={photos}
          loading={loading}
          onEdit={(id) => navigate(`/admin/photos/${id}/edit`)}
          onDelete={handleDelete}
          emptyMessage="No photos yet. Upload your first one."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPhotos;
