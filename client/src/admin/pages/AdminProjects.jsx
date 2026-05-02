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

const COLS = [
  {
    key: "coverImage",
    label: "Cover",
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
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  {
    key: "photoCount",
    label: "Photos",
    render: (v) => <span style={{ color: "rgba(0,0,0,0.38)" }}>{v ?? 0}</span>,
  },
];

const AdminProjects = () => {
  const { data, loading, error, refetch } = useFetch("/api/collections");
  const navigate = useNavigate();
  const projects = data?.data || [];

  const del = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    await fetch(
      `https://photography-portfolio-k7o4.onrender.com/api/collections/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    refetch();
  };

  return (
    <AdminLayout title="Projects">
      {/* Header row */}
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
            : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
        </p>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="admin-btn-primary"
        >
          New Project
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
          rows={projects}
          loading={loading}
          onEdit={(id) => navigate(`/admin/projects/${id}/edit`)}
          onDelete={del}
          emptyMessage="No projects yet — create your first one."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
