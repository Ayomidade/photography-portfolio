/**
 * Commissions
 *
 * Commercial work page — describes Anthony Monday's
 * commission services and embeds the contact form.
 */

import SectionLabel from "@/components/ui/SectionLabel";
import SEO from "@/components/SEO";
import ContactForm from "@/components/contact/ContactForm";

const commissionTypes = [
  {
    title: "Editorial",
    description:
      "Storytelling photography for magazines, newspapers, and online publications. Available for assignment across Nigeria and internationally.",
  },
  {
    title: "Corporate",
    description:
      "Brand identity, executive portraiture, events, and corporate communications photography for organisations and institutions.",
  },
  {
    title: "Documentary",
    description:
      "Long-form documentary and reportage work for NGOs, foundations, and social impact organisations.",
  },
  {
    title: "Fine Art Prints",
    description:
      "Limited edition fine art prints from existing collections. Available in multiple sizes with certificate of authenticity.",
  },
];

const Commissions = () => {
  return (
    <>
    <SEO title="Commissions" description="Explore Anthony Monday's commission services and get in touch to discuss your project." />
      
      <div
        style={{
          background: "var(--black)",
          padding: "var(--section-padding)",
          paddingTop: "160px",
        }}
      >
        {/* Page header */}
        <SectionLabel label="Work With Me" />
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(45px, 4vw, 40px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: "24px",
          }}
        >
          Commissions
        </h1>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 2,
            color: "var(--muted)",
            maxWidth: "560px",
            marginBottom: "80px",
          }}
        >
          Anthony Monday is available for commissions and artistic
          collaborations. Whether editorial, corporate, or documentary — each
          project is approached with the same deliberate attention to light,
          atmosphere, and narrative.
        </p>

        {/* Commission types */}
        <div
          className="commissions-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
            marginBottom: "120px",
          }}
        >
          {commissionTypes.map(({ title, description }) => (
            <div
              key={title}
              style={{
                background: "var(--surface)",
                padding: "40px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "24px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--text)",
                  marginBottom: "16px",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div
          className="commissions-form"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            borderTop: "1px solid var(--border)",
            paddingTop: "80px",
          }}
        >
          <div>
            <SectionLabel label="Start a Project" />
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--text)",
                margin: "20px 0 24px",
              }}
            >
              Tell me about your project.
            </h2>
            <p
              style={{
                fontSize: "12px",
                lineHeight: 2,
                color: "var(--muted)",
                maxWidth: "380px",
              }}
            >
              Describe your brief, timeline and budget in the message field and
              I'll be in touch within 48 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .commissions-grid {
            grid-template-columns: 1fr !important;
          }
          .commissions-form {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .commissions-grid {
            grid-template-columns: 1fr !important;
          }
          .commissions-form {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 48px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Commissions;
