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

const COLS = [
  {
    key: "imageUrl",
    label: "Image",
    render: (v) =>
      v ? (
        <img
          src={v}
          alt=""
          style={{
            width: "48px",
            height: "34px",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "48px",
            height: "34px",
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
    render: (v) => (
      <span
        style={{
          fontSize: "9px",
          color: v ? "#1a1a1a" : "rgba(0,0,0,0.25)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: v ? 500 : 300,
        }}
      >
        {v ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "collectionId",
    label: "Type",
    render: (v) => (
      <span
        style={{
          fontSize: "9px",
          color: "rgba(0,0,0,0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {v ? "Project" : "Commission"}
      </span>
    ),
  },
];

const AdminPhotos = () => {
  const { data, loading, error, refetch } = useFetch("/api/photos/all?standalone=true");
  const navigate = useNavigate();
  const photos = data?.data || [];

  const del = async (id) => {
    if (!window.confirm("Delete this photo permanently?")) return;
    await fetch(
      `https://photography-portfolio-k7o4.onrender.com/api/photos/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    refetch();
  };

  return (
    <AdminLayout title="Photos">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.32)",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
          }}
        >
          {loading
            ? "..."
            : `${photos.length} photo${photos.length !== 1 ? "s" : ""}`}
        </p>
        <button
          onClick={() => navigate("/admin/photos/new")}
          className="admin-btn-primary"
        >
          Upload Photo
        </button>
      </div>

      {error && (
        <div className="admin-error" style={{ marginBottom: "16px" }}>
          {error}
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}>
        <AdminTable
          columns={COLS}
          rows={photos}
          loading={loading}
          onEdit={(id) => navigate(`/admin/photos/${id}/edit`)}
          onDelete={del}
          emptyMessage="No photos yet — upload your first one."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPhotos;
