const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  email: String,
  username: String,
  password: String,
  age: Number,
})

module.exports = mongoose.model('User', userSchema)