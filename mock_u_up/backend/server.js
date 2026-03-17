require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB conectada'))
  .catch(err => console.log(err))

app.listen(3000, () => console.log('Server corriendo'))

const authRoutes = require('./src/routes/auth')

app.use('/api/auth', authRoutes)