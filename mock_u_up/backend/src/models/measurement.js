const mongoose = require('mongoose')

const measurementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weight: Number,
  bodyFat: Number,
  date: Date
})

module.exports = mongoose.model('Measurement', measurementSchema)