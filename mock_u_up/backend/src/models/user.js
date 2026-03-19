const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  createdAt: Date,
  username: String,
  password: String,
  age: Number,
})

const userInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  weight: Number,
  height: Number,
  bodyType: String,
  goal: String,
})

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
})

const skinFoldMeasurementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  biceps: Number,
  subscapular: Number,
  iliacCrest: Number,
  abs: Number,
  femoral: Number,
})

const calisthenicsWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  handstand: Number,
  pullups: Number,
  pushups: Number,
  l_sit: Number,
  v_sit: Number
})

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
})


module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('UserInfo', userInfoSchema)
module.exports = mongoose.model('BodyMeasurement', bodyMeasurementSchema)
module.exports = mongoose.model('SkinFoldMeasurement', skinFoldMeasurementSchema)
module.exports = mongoose.model('CalisthenicsWorkout', calisthenicsWorkoutSchema)
module.exports = mongoose.model('WeightTrainingWorkout', weightTrainingWorkoutSchema) 