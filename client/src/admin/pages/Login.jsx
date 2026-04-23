/**
 * Login
 *
 * Public admin login page.
 * Redirects to dashboard if already authenticated.
 */

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

const Login = () => {
  const { admin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    padding: "10px 0",
    color: "#1a1a1a",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.4)",
    marginBottom: "10px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 400,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafaf9",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>
        {/* Header */}
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
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
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.3)",
            marginBottom: "48px",
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
          Admin Access
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Username</label>
            <input
              style={inputStyle}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="anthony"
              required
              autoComplete="username"
              onFocus={(e) => (e.target.style.borderBottomColor = "#1a1a1a")}
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "rgba(0,0,0,0.12)")
              }
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              onFocus={(e) => (e.target.style.borderBottomColor = "#1a1a1a")}
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "rgba(0,0,0,0.12)")
              }
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: "11px",
                color: "#c0392b",
                marginBottom: "16px",
                letterSpacing: "0.05em",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#fff",
              background: loading ? "rgba(0,0,0,0.25)" : "#1a1a1a",
              border: "none",
              padding: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.opacity = "0.75";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
