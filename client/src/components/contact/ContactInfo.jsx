/**
 * ContactInfo
 *
 * Left panel of the ContactSection.
 * Renders the section label, tagline and contact details.
 * All static content — no props needed.
 */

import SectionLabel from "@/components/ui/SectionLabel";

const contactItems = [
  { label: "Email", value: "hello@anthonymonday.com" },
  { label: "Location", value: "Lagos, Nigeria\nAvailable worldwide" },
  { label: "Work", value: "Commissions · Prints\nExhibitions · Licensing" },
];

const ContactInfo = () => {
  return (
    <div>
      <SectionLabel label="Get in Touch" />

      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(28px, 3vw, 44px)",
          fontWeight: 300,
          lineHeight: 1.2,
          fontStyle: "italic",
          color: "var(--text)",
          margin: "20px 0 32px",
        }}
      >
        Let's create something that lasts.
      </h2>

      <div style={{ marginTop: "48px" }}>
        {contactItems.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              padding: "20px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--accent)",
                width: "80px",
                flexShrink: 0,
                paddingTop: "2px",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
