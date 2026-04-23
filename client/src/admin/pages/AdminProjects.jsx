/**
 * AdminProjects
 *
 * Lists all projects with edit and delete.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import AdminTable from "@/admin/components/AdminTable";
import useFetch from "@/hooks/useFetch";

const columns = [
  {
    key: "coverImage",
    label: "Cover",
    render: (val) =>
      val ? (
        <img
          src={val}
          alt="cover"
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
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  {
    key: "photoCount",
    label: "Photos",
    render: (val) => (
      <span style={{ color: "rgba(0,0,0,0.4)" }}>{val ?? 0}</span>
    ),
  },
];

const AdminProjects = () => {
  const { data, loading, error, refetch } = useFetch("/api/collections");
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(null);

  const projects = data?.data || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/collections/${id}`, {
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
    <AdminLayout title="Projects">
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
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => navigate("/admin/projects/new")}
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
          New Project
        </button>
      </div>

      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px", marginBottom: "16px" }}>
          Failed to load projects.
        </p>
      )}

      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
        <AdminTable
          columns={columns}
          rows={projects}
          loading={loading}
          onEdit={(id) => navigate(`/admin/projects/${id}/edit`)}
          onDelete={handleDelete}
          emptyMessage="No projects yet. Create your first one."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
