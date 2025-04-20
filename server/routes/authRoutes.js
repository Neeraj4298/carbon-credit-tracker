const verifyToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');
const geocodeAddress = require('../utils/geocode');
router.post('/register', register);
router.post('/login', login);
router.put('/address/:id', verifyToken, async (req, res) => {
    const { homeAddress, workAddress } = req.body;
  
    try {
        const homeCoords = await geocodeAddress(homeAddress);
        const workCoords = await geocodeAddress(workAddress);
    
        console.log('Home coordinates:', homeCoords);
        console.log('Work coordinates:', workCoords);
      await User.findByIdAndUpdate(req.params.id, {
        homeAddress,
        workAddress
      });
      res.json({ msg: 'Address updated' });
    } catch (err) {
     console.error(err);
      res.status(500).send('Failed to update address');
    }
  });
  

module.exports = router;
