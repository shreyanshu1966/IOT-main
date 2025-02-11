const express = require("express");
const router = express.Router();
const { sendQuoteEmail } = require("../models/emailController");

router.post("/request", async (req, res) => {
  const { name, email, phone, product, message } = req.body;

  if (!name || !email || !phone || !product) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required" 
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