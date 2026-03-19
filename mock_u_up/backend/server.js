require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.listen(3000, () => console.log('Server corriendo'))

const authRoutes = require('./src/routes/auth')

app.use('/api/auth', authRoutes)