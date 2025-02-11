const nodemailer = require("nodemailer");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debugging
  logger: true  // Log to console
});

// Verify transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Sanitization helper
const sanitizeInput = (text) => {
  return text.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
};

exports.sendQuoteEmail = async ({ name, email, phone, product, message }) => {
  try {
    const sanitizedMessage = sanitizeInput(message || '');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Quote Request: ${product.substring(0, 50)}`, // Prevent long subjects
      html: `
        <h3 style="color: #2563eb;">New Quote Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Quote email sent successfully");
    
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
};