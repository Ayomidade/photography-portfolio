/**
 * AdminLayout
 *
 * Sidebar fixed left, content scrolls on the right.
 * All protected admin pages wrap with this.
 *
 * Props:
 * - title (string) — passed to AdminTopbar
 * - children — page content
 */

import "@/admin/styles/admin.css";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ title, children }) => {
  return (
    <div className="admin-root" style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      {/* Main content area */}
      <div
        className="admin-main"
        style={{
          flex: 1,
          marginLeft: "220px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Page topbar */}
        <header
          className="admin-page-topbar"
          style={{
            height: "56px",
            background: "#fff",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            padding: "0 36px",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "19px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#1a1a1a",
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </h1>
        </header>

        {/* Page body */}
        <main
          className="admin-page-body"
          style={{ padding: "32px 36px", flex: 1 }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-main {
            margin-left: 0 !important;
            padding-top: 52px;
          }
          .admin-page-topbar {
            top: 52px !important;
            padding: 0 20px !important;
          }
          .admin-page-body {
            padding: 24px 20px !important;
          }
        }
        @media (max-width: 480px) {
          .admin-page-body {
            padding: 20px 16px !important;
          }
          .admin-page-topbar {
            padding: 0 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;