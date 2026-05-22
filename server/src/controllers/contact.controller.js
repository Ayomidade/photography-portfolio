import nodemailer from "nodemailer";

/**
 * Contact Controller
 *
 * Uses Gmail SMTP over port 587 (STARTTLS) — works on Render free tier.
 * Port 465 (SSL) is blocked by Render. Port 587 is not.
 *
 * Requires:
 * - EMAIL_USER: your Gmail address e.g. anthony@gmail.com
 * - EMAIL_PASS: Gmail App Password (16 chars, NOT your regular password)
 * - ADMIN_EMAIL: where contact form submissions are delivered
 */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false = STARTTLS — required for port 587
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/**
 * Send contact message
 *
 * POST /api/contact
 * Body: { name, email, subject, message }
 */
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Validate message length
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;

    // Email to admin
    await transporter.sendMail({
      from: `"Anthony Monday Portfolio" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border: 1px solid #e0e0e0;">
          <h2 style="font-size: 22px; font-weight: 400; color: #1a1a1a; margin-bottom: 24px;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #888; font-size: 12px; width: 90px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #888; font-size: 12px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #888; font-size: 12px;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 14px;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; font-size: 12px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 11px; color: #aaa;">
            Reply directly to this email to respond to ${name} at ${email}
          </p>
        </div>
      `,
    });

    // Confirmation email to visitor
    await transporter.sendMail({
      from: `"Anthony Monday Photography" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message — ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border: 1px solid #e0e0e0;">
          <h2 style="font-size: 22px; font-weight: 400; color: #1a1a1a; margin-bottom: 8px;">Thank you, ${name}.</h2>
          <p style="font-size: 12px; color: #888; margin-bottom: 24px;">Anthony Monday Photography</p>
          <p style="font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 20px;">
            Your message has been received. I'll be in touch with you shortly.
          </p>
          <div style="padding: 20px; background: #fff; border-left: 3px solid #1a1a1a; margin-bottom: 24px;">
            <p style="font-size: 11px; color: #888; margin-bottom: 8px; text-transform: uppercase;">Your message</p>
            <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
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
