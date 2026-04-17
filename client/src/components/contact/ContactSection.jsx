/**
 * ContactSection
 *
 * Full contact section composing ContactInfo and ContactForm
 * in a two-column split layout. Used on both Home and Contact pages.
 */

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <>
      <section
        className="contact-section"
        style={{
          background: "var(--black)",
          borderTop: "1px solid var(--border)",
          padding: "var(--section-padding)",
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
          .contact-section {
            gap: 48px !important;
          }
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
