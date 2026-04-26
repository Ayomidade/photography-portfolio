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

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf8",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.25)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Verifying...
        </p>
      </div>
    );

  return admin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;