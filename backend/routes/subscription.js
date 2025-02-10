const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { checkSubscription } = require('../middleware/subscription');
const Subscription = require('../models/Subscription');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create subscription payment order
router.post('/create-subscription', auth, async (req, res) => {
  try {
    // Check if user already has active subscription
    const existingSubscription = await Subscription.findOne({
      user: req.user.userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (existingSubscription) {
      return res.status(400).json({ message: 'User already has active subscription' });
    }

    const amount = 299;
    const currency = 'INR';
    const options = {
      amount,
      currency,
      receipt: `sub_${Math.random().toString(36).substring(7)}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Verify payment and activate subscription
router.post('/verify-subscription', auth, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Create subscription
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const subscription = new Subscription({
      user: req.user.userId,
      endDate,
      paymentDetails: {
        razorpay_payment_id,
        razorpay_order_id, 
        razorpay_signature
      }
    });

    await subscription.save();
    res.json({ message: 'Subscription activated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this route to check subscription status
router.get('/status', auth, checkSubscription, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      user: req.user.userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });
    
    res.json({ active: !!subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;