const express = require("express");
const router = express.Router();
const { sendQuoteEmail } = require("../models/emailController");

// The full path will be /api/quote/request
router.post("/request", async (req, res) => {
  const { name, email, phone, product, message } = req.body;

  if (!name || !email || !phone || !product) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await sendQuoteEmail({ name, email, phone, product, message });
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending quote request:", error);
    res.status(500).json({ error: "Failed to send quote request" });
  }
});

module.exports = router;