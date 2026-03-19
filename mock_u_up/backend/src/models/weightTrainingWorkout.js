const mongoose = require('mongoose');

const weightTrainingWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  bench_press: Number,
  military_press: Number,
  pull_ups: Number,
  curl: Number,
  extension: Number,
  squat: Number,
  deadlift: Number
});

module.exports = mongoose.model('WeightTrainingWorkout', weightTrainingWorkoutSchema);
