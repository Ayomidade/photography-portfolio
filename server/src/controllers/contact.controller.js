import nodemailer from "nodemailer";

/**
 * Contact Controller
 *
 * Handles incoming contact form submissions.
 * Validates form data, sends email to admin and confirmation to user.
 */

// Initialize transporter for email sending
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send contact message
 *
 * POST /api/contact
 * Body: { name, email, subject, message }
 *
 * Response: { success: true, message: "Message sent successfully" }
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

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Best regards,<br>Anthony Monday</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

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
