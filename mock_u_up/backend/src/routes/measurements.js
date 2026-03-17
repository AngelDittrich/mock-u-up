const router = require('express').Router()
const Measurement = require('../models/Measurement')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
  const data = await Measurement.create({
    ...req.body,
    userId: req.user.id
  })

  res.json(data)
})

module.exports = router