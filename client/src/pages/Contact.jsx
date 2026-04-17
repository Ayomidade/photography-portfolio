/**
 * Contact
 *
 * Standalone contact page — full ContactSection plus
 * direct contact details in the style of Andrew Esiebo's contact page.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import ContactSection from "@/components/contact/ContactSection";

const Contact = () => {
  return (
    <>
      <div
        style={{
          background: "var(--black)",
          paddingTop: "160px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingBottom: "0",
        }}
      >
        <SectionLabel label="Reach Out" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(48px, 6vw, 80px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--text)",
          }}
        >
          Contact
        </h1>
      </div>

      <ContactSection />
    </>
  );
};

export default Contact;
