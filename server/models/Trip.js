const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  method: {
    type: String,
    enum: ['public', 'carpool', 'rideshare', 'wfh'],
    required: true,
  },
  miles: {
    type: Number,
    required: true,
  },
  pointsEarned: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Trip', TripSchema);
