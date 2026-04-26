/**
 * Dashboard
 *
 * Overview — stat cards + quick action links.
 */

import { Link } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import StatCard from "@/admin/components/StatCard";
import useFetch from "@/hooks/useFetch";

const QUICK = [
  { label: "New Project", to: "/admin/projects/new" },
  { label: "Upload Photo", to: "/admin/photos/new" },
  { label: "All Projects", to: "/admin/projects" },
  { label: "All Photos", to: "/admin/photos" },
];

const Dashboard = () => {
  const { data: pd } = useFetch("/api/photos");
  const { data: cd } = useFetch("/api/collections");

  const totalPhotos = pd?.count ?? "—";
  const totalProjects = cd?.data?.length ?? "—";
  const standalone = pd?.data?.filter((p) => !p.collectionId).length ?? "—";

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div
        className="dashboard-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          marginBottom: "36px",
        }}
      >
        <StatCard
          label="Total Photos"
          value={totalPhotos}
          sub="All images"
          accent
        />
        <StatCard label="Projects" value={totalProjects} sub="Collections" />
        <StatCard
          label="Commissions"
          value={standalone}
          sub="Standalone photos"
        />
      </div>

      {/* Quick actions */}
      <div>
        <p
          style={{
            fontSize: "8px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.28)",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "16px",
              height: "1px",
              background: "rgba(0,0,0,0.18)",
              display: "inline-block",
            }}
          />
          Quick Actions
        </p>
        <div
          className="quick-actions"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {QUICK.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,0,0,0.1)",
                padding: "10px 20px",
                textDecoration: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                background: "#fff",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1a1a1a";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)";
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
          .dashboard-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .dashboard-stats { grid-template-columns: 1fr !important; }
          .quick-actions a { flex: 1 1 calc(50% - 4px); text-align: center; }
        }
      `}</style>
    </AdminLayout>
  );
};

export default Dashboard;