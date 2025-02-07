const Subscription = require('../models/Subscription');

const checkSubscription = async (req, res, next) => {
  try {
    // Skip subscription check for admin users
    if (req.user.role === 'admin') {
      return next();
    }

    const subscription = await Subscription.findOne({
      user: req.user.userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (!subscription) {
      return res.status(403).json({ message: 'Active subscription required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription' });
  }
};

module.exports = { checkSubscription };