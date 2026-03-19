const mongoose = require('mongoose');

const skinFoldMeasurementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  biceps: Number,
  subscapular: Number,
  iliacCrest: Number,
  abs: Number,
  femoral: Number,
});

module.exports = mongoose.model('SkinFoldMeasurement', skinFoldMeasurementSchema);
