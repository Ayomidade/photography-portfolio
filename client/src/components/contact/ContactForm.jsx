/**
 * ContactForm
 *
 * Controlled form — Name, Email, Subject, Message.
 * Submits to POST /api/contact.
 * Border-bottom inputs — minimal, matches Andrew Esiebo style.
 */

import { useState } from "react";
import { sendContactMessage } from "@/services/api";

const initialState = { name: "", email: "", subject: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

  if (success)
    return (
      <div style={{ paddingTop: "16px" }}>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "22px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          Message received.
        </p>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.9 }}>
          Thank you for reaching out. A confirmation has been sent to your
          inbox.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            marginTop: "20px",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--sans)",
            transition: "color var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          Send another message
        </button>
      </div>
    );

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    padding: "10px 0",
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
    fontWeight: 400,
  };

  const fields = [
    { name: "name", label: "Your Name", type: "text", placeholder: "Jane Doe" },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "jane@example.com",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Commission inquiry",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>{label}</label>
          <input
            style={inputStyle}
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required
            onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
            onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
          />
        </div>
      ))}

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Message</label>
        <textarea
          style={{ ...inputStyle, resize: "none", height: "90px" }}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
      </div>

      {error && (
        <p
          style={{
            fontSize: "11px",
            color: "#c0392b",
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
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--bg)",
          background: loading ? "var(--muted)" : "var(--text)",
          border: "none",
          padding: "14px 40px",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--sans)",
          fontWeight: 400,
          transition: "opacity var(--transition), background var(--transition)",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.opacity = "0.75";
        }}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
