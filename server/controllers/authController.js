const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role, organization } = req.body;
  
  try {
    // Log the received data (remove in production)
    console.log('Registration attempt:', { name, email, role, organization });

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      organization,
    });

    if (role === 'employer') {
      user.isApproved = true;
    }

    await user.save();
    console.log('User registered successfully:', user._id);
    res.status(201).json({ msg: 'User registered successfully' });
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        organization: user.organization,
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
