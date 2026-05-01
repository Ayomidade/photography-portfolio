/**
 * Login
 *
 * Public admin login page.
 * Redirects to dashboard if already authenticated.
 */
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";
import "@/admin/styles/admin.css";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { admin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPw, setShowPw] = useState(false);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.username, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              marginBottom: "6px",
            }}
          >
            Anthony Monday
          </p>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.3)",
              fontFamily: "Montserrat, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "1px",
                background: "rgba(0,0,0,0.2)",
              }}
            />
            Admin
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.38)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                marginBottom: "9px",
              }}
            >
              Username
            </label>
            <input
              className="admin-input"
              type="text"
              value={form.username}
              onChange={(e) =>
                setForm((p) => ({ ...p, username: e.target.value }))
              }
              placeholder="anthony"
              required
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px", position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.38)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                marginBottom: "9px",
              }}
            >
              Password
            </label>
            <input
              className="admin-input"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{ paddingRight: "60px" }}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              style={{
                position: "absolute",
                right: "12px",
                top: "34px",
                fontSize: "8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.28)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat, sans-serif",
                padding: 0,
              }}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <div className="admin-error" style={{ marginBottom: "18px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "10px",
              color: "rgba(0,0,0,0.3)",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Need an account?{" "}
            <Link
              to="/admin/register"
              style={{
                color: "#1a1a1a",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
