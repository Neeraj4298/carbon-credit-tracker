const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');
router.post('/', verifyToken, async (req, res) => {
  const { method, miles } = req.body;
  const userId = req.user.id; // from decoded token
});

router.get('/user/:id', verifyToken, async (req, res) => {
    const trips = await Trip.find({ user: req.params.id });
    res.json(trips);
  });
  
// POST: Log a trip
router.post('/', async (req, res) => {
  const { userId, method, miles } = req.body;

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
});

module.exports = router;
