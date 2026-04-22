/**
 * ContactSection
 *
 * Two-column split — ContactInfo left, ContactForm right.
 * Used on both Home (preview) and Contact page.
 */

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <>
      <section
        className="contact-section"
        style={{
          padding: "var(--section-padding)",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
        }}
      >
        <ContactInfo />
        <ContactForm />
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .contact-section { gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .contact-section {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ContactSection;
