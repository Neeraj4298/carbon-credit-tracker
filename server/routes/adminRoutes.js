const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');

// GET: All employers pending approval
router.get('/pending-employers', verifyToken, async (req, res) => {
  const employers = await User.find({ role: 'employer', isApproved: false });
  res.json(employers);
});

// PUT: Approve employer by ID
router.put('/approve-employer/:id', verifyToken, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ msg: 'Employer approved' });
});

module.exports = router;
