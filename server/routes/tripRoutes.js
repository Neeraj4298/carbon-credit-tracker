const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');

// POST: Log a trip (with authentication)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { method, miles } = req.body;
    const userId = req.user.id; // from decoded token

    const pointMap = {
      public: 5,
      carpool: 4,
      rideshare: 3,
      wfh: 6,
    };

    const points = method === 'wfh' ? pointMap[method] : miles * pointMap[method];

    const trip = new Trip({
      user: userId,
      method,
      miles,
      pointsEarned: points,
    });

    await trip.save();
    await User.findByIdAndUpdate(userId, { $inc: { carbonCredits: points } });

    res.json({ msg: 'Trip logged', trip });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET: Get trips for a specific user
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.params.userId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
