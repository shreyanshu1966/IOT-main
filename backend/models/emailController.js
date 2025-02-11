const nodemailer = require("nodemailer");
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Sanitization helper
const sanitizeInput = (text) => {
  return text.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
};

exports.sendQuoteEmail = async ({ name, email, phone, product, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration is missing");
  }

  try {
    const sanitizedMessage = sanitizeInput(message || '');

    const mailOptions = {
      from: `"Intuitive Robotics" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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