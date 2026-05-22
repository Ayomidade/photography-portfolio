import { Resend } from "resend";
import { config } from "dotenv";

/**
 * Contact Controller
 *
 * Uses Resend HTTP API — works reliably on Render free tier.
 * Nodemailer SMTP fails on Render due to outbound port blocking
 * and IPv6 routing issues on the free plan.
 *
 * Requires:
 * - RESEND_API_KEY: from resend.com dashboard
 * - ADMIN_EMAIL: where contact form submissions are delivered
 */

config();
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * sendContactMessage
 * POST /api/contact
 * Body: { name, email, subject, message }
 */
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ── Validation ──
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;

    // ── Email to Anthony ──
    await resend.emails.send({
      from: "Anthony Monday Portfolio <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border: 1px solid #e0e0e0;">
          <h2 style="font-size: 22px; font-weight: 400; color: #1a1a1a; margin-bottom: 24px;">
            New Contact Inquiry
          </h2>
          <div style="display: grid; gap: 16px;">
            <div style="padding: 16px; background: #fff; border-radius: 8px;">
              <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 14px;">${name}</p>
            </div>
            <div style="padding: 16px; background: #fff; border-radius: 8px;">
              <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 14px;">${email}</p>
            </div>
            <div style="padding: 16px; background: #fff; border-radius: 8px;">
              <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Subject</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 14px;">${subject}</p>
            </div>
            <div style="padding: 16px; background: #fff; border-radius: 8px;">
              <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #aaa;">
            Reply directly to this email to respond to ${name} at ${email}
          </p>
        </div>
      `,
    });

    // ── Confirmation to visitor ──
    await resend.emails.send({
      from: "Anthony Monday Photography <onboarding@resend.dev>",
      to: [email],
      subject: `We received your message — ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border: 1px solid #e0e0e0;">
          <h2 style="font-size: 22px; font-weight: 400; color: #1a1a1a; margin-bottom: 8px;">
            Thank you, ${name}.
          </h2>
          <p style="font-size: 12px; color: #888; margin-bottom: 24px;">Anthony Monday Photography</p>
          <p style="font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 20px;">
            Your message has been received. I'll be in touch shortly.
          </p>
          <div style="display: grid; gap: 16px; padding: 20px; background: #fff; border-radius: 8px; margin-bottom: 24px;">
            <div>
              <p style="margin: 0 0 8px; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Subject</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 14px;">${subject}</p>
            </div>
            <div>
              <p style="margin: 0 0 8px; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <p style="font-size: 12px; color: #aaa;">
            If you did not send this message, please ignore this email.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Message sent successfully. A confirmation has been sent to your email.",
    });
  } catch (error) {
    console.error("contact error:", error.message);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to send message. Please try again later.",
    });
  }
};

export default { sendContactMessage };
