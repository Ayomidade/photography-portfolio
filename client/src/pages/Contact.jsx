/**
 * Contact
 *
 * Page header + ContactSection.
 * Matches Andrew Esiebo contact page structure.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import ContactSection from "@/components/contact/ContactSection";

const Contact = () => {
  return (
    <>
      <div
      className="section-header"
        style={{
          padding: "calc(var(--nav-height) + 64px) 48px 0",
          background: "var(--bg)",
        }}
      >
        <SectionLabel label="Reach Out" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(35px, 6vw, 60px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          Contact
        </h1>
      </div>

      <ContactSection />


  <style>{`
        
        @media (max-width: 480px) {
          .section-header { padding-left: 20px !important; }
          .section-header { padding-top: calc(var(--nav-height) + 40px) !important; }
        }
      `}</style>
    </>
  );
};

export default Contact;
