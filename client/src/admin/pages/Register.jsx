import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";
import "@/admin/styles/admin.css";

const Register = () => {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email:"",
    username: "",
    password: "",
    confirmPassword: "",
    // secretKey: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showKey, setShowKey] = useState(false);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 8
        ? 1
        : form.password.length < 12
          ? 2
          : 3;

  const strengthLabel = ["", "Too short", "Good", "Strong"][strength];
  const strengthColor = ["", "#c0392b", "#e67e22", "#27ae60"][strength];
  const strengthW = ["0%", "33%", "66%", "100%"][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");
    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 2200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success)
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
        <div style={{ textAlign: "center", maxWidth: "320px" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "28px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#1a1a1a",
              marginBottom: "12px",
            }}
          >
            Account created.
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(0,0,0,0.35)",
              fontFamily: "Montserrat, sans-serif",
              lineHeight: 1.8,
            }}
          >
            Redirecting to sign in...
          </p>
        </div>
      </div>
    );

  const LabelEl = ({ children }) => (
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
      {children}
    </label>
  );

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
        <div style={{ marginBottom: "44px" }}>
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
            Create Account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <LabelEl>Email</LabelEl>
            <input
              className="admin-input"
              type="text"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="example@gmail.com"
              required
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <LabelEl>Username</LabelEl>
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

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <LabelEl>Password</LabelEl>
            <input
              className="admin-input"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              placeholder="Min. 8 characters"
              required
              autoComplete="new-password"
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

          {/* Strength meter */}
          {form.password && (
            <div style={{ marginBottom: "20px", marginTop: "-10px" }}>
              <div
                style={{
                  height: "2px",
                  background: "rgba(0,0,0,0.07)",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: strengthW,
                    background: strengthColor,
                    transition: "width 0.3s, background 0.3s",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "9px",
                  color: strengthColor,
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {strengthLabel}
              </p>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <LabelEl>Confirm Password</LabelEl>
            <input
              className="admin-input"
              type={showPw ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((p) => ({ ...p, confirmPassword: e.target.value }))
              }
              placeholder="Repeat password"
              required
              autoComplete="new-password"
            />
          </div>

          {/* <div style={{ marginBottom: "28px", position: "relative" }}>
            <LabelEl>
              Secret Key
              <span
                style={{
                  textTransform: "none",
                  letterSpacing: 0,
                  fontWeight: 300,
                  opacity: 0.6,
                  fontSize: "8px",
                }}
              >
                {" "}
                — ADMIN_SECRET_KEY in .env
              </span>
            </LabelEl>
            <input
              className="admin-input"
              type={showKey ? "text" : "password"}
              value={form.secretKey}
              onChange={(e) =>
                setForm((p) => ({ ...p, secretKey: e.target.value }))
              }
              placeholder="Enter secret key"
              required
              style={{ paddingRight: "60px" }}
            />
            <button
              type="button"
              onClick={() => setShowKey((p) => !p)}
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
              {showKey ? "Hide" : "Show"}
            </button>
          </div> */}

          {error && (
            <div className="admin-error" style={{ marginBottom: "16px" }}>
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
            {loading ? "Creating..." : "Create Account →"}
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
            Have an account?{" "}
            <Link
              to="/admin/login"
              style={{ color: "#1a1a1a", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
