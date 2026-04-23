/**
 * Dashboard
 *
 * Overview — stat cards + quick action links.
 */

import { Link } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import StatCard from "@/admin/components/StatCard";
import useFetch from "@/hooks/useFetch";

const quickActions = [
  { label: "New Project", to: "/admin/projects/new" },
  { label: "Upload Photo", to: "/admin/photos/new" },
  { label: "All Projects", to: "/admin/projects" },
  { label: "All Photos", to: "/admin/photos" },
];

const Dashboard = () => {
  const { data: photosData } = useFetch("/api/photos");
  const { data: collectionsData } = useFetch("/api/collections");

  const totalPhotos = photosData?.count ?? "—";
  const totalProjects = collectionsData?.data?.length ?? "—";
  const standalone =
    photosData?.data?.filter((p) => !p.collectionId).length ?? "—";

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div
        className="admin-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          marginBottom: "40px",
        }}
      >
        <StatCard
          label="Total Photos"
          value={totalPhotos}
          sub="All uploaded images"
        />
        <StatCard
          label="Projects"
          value={totalProjects}
          sub="Named collections"
        />
        <StatCard
          label="Images"
          value={standalone}
          sub="Standalone photos"
        />
      </div>

      {/* Quick actions */}
      <div>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.3)",
            marginBottom: "16px",
            fontFamily: "Montserrat, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "1px",
              background: "rgba(0,0,0,0.2)",
            }}
          />
          Quick Actions
        </p>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {quickActions.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,0,0,0.1)",
                padding: "11px 22px",
                textDecoration: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                transition: "color 0.2s, border-color 0.2s",
                background: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1a1a1a";
                e.currentTarget.style.borderColor = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(0,0,0,0.4)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .admin-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
};

export default Dashboard;
