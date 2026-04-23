/**
 * ProtectedRoute
 *
 * Redirects unauthenticated users to /admin/login.
 * Shows nothing during session check to prevent flash.
 */

import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.3)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Verifying session...
        </p>
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
