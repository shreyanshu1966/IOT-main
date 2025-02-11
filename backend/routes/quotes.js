const express = require("express");
const router = express.Router();
const { sendQuoteEmail } = require("../models/emailController");

router.post("/request", async (req, res) => {
  const { name, email, phone, product, message } = req.body;

  // Input validation
  if (!name || !email || !phone || !product) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required" 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format"
    });
  }

  try {
    await sendQuoteEmail({ name, email, phone, product, message });
    res.json({ 
      success: true, 
      message: "Quote request sent successfully" 
    });
  } catch (error) {
    console.error("Error sending quote request:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send quote request",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;