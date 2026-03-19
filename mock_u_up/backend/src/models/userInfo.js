const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  weight: Number,
  height: Number,
  bodyType: String,
  goal: String,
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
