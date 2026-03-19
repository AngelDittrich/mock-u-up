const mongoose = require('mongoose');

const calisthenicsWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  handstand: Number,
  pullups: Number,
  pushups: Number,
  l_sit: Number,
  v_sit: Number
});

module.exports = mongoose.model('CalisthenicsWorkout', calisthenicsWorkoutSchema);
