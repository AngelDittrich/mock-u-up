const mongoose = require('mongoose');

const bodyMeasurementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  arm: Number,
  chest: Number,
  forearm: Number,
  abs: Number,
  hips: Number,
  leg: Number,
  calf: Number,
});

module.exports = mongoose.model('BodyMeasurement', bodyMeasurementSchema);
