const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  console.log("IN REGISTER!");
  console.log("SCHEMA:", Object.keys(User.schema.obj));
  console.log("BODY:", req.body);
  const { email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)
  console.log("HASHED:", hashed);

  const user = await User.create({ email, password: hashed })
  console.log("CREATED:", user);

  res.json(user)
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ msg: 'No existe' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ msg: 'Error credenciales' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.json({ token })
}