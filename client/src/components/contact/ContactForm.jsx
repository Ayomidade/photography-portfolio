/**
 * ContactForm
 *
 * Controlled form with four fields — Name, Email, Subject, Message.
 * Submits to POST /api/contact via api.js.
 * Manages loading, success and error states internally.
 */

import { useState } from "react";
import { sendContactMessage } from "@/services/api";

const initialState = { name: "", email: "", subject: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendContactMessage(form);
      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100%",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--text)",
          }}
        >
          Message received.
        </p>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8 }}>
          Thank you for reaching out. A confirmation has been sent to your inbox
          — I'll be in touch shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            marginTop: "8px",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    padding: "12px 0",
    color: "var(--text)",
    fontFamily: "var(--sans)",
    fontSize: "13px",
    fontWeight: 300,
    outline: "none",
    transition: "border-color var(--transition)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "10px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Your Name</label>
        <input
          style={inputStyle}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Email Address</label>
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          required
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Subject</label>
        <input
          style={inputStyle}
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Commission inquiry"
          required
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Message</label>
        <textarea
          style={{ ...inputStyle, resize: "none", height: "100px" }}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
      </div>

      {error && (
        <p
          style={{
            fontSize: "11px",
            color: "#e05c5c",
            marginBottom: "16px",
            letterSpacing: "0.05em",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "8px",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--black)",
          background: loading ? "var(--muted)" : "var(--accent)",
          border: "none",
          padding: "16px 40px",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--sans)",
          fontWeight: 300,
          transition: "opacity var(--transition), background var(--transition)",
          width: "100%",
        }}
      >
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
};

export default ContactForm;
