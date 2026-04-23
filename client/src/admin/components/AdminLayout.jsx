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

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ title, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#fafaf9",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <AdminSidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      <div
        className="admin-content"
        style={{
          flex: 1,
          marginLeft: "220px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AdminTopbar title={title} onMenuToggle={toggleMobileMenu} />
        <div style={{ padding: "36px", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
