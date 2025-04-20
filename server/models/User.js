const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employer', 'employee'],
    default: 'employee',
  },
  organization: {
    type: String,
    default: '',
  },
  carbonCredits: {
    type: Number,
    default: 0,
  },
  homeAddress: {
    type: String,
    default: ''
  },
  workAddress: {
    type: String,
    default: ''
  },
  isApproved: {
    type: Boolean,
    default: false
  }
  
  
  
});

module.exports = mongoose.model('User', UserSchema);
