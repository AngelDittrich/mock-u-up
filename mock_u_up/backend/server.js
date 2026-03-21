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
const measurementsRoutes = require('./src/routes/measurements')
app.use('/api/measurements', measurementsRoutes)

const userInfoRoutes = require('./src/routes/userInfo')
app.use('/api/userInfo', userInfoRoutes)

const bodyMeasurementsRoutes = require('./src/routes/bodyMeasurements')
app.use('/api/bodyMeasurements', bodyMeasurementsRoutes)

const skinFoldMeasurementsRoutes = require('./src/routes/skinFoldMeasurements')
app.use('/api/skinFoldMeasurements', skinFoldMeasurementsRoutes)

const calisthenicsWorkoutsRoutes = require('./src/routes/calisthenicsWorkouts')
app.use('/api/calisthenicsWorkouts', calisthenicsWorkoutsRoutes)

const weightTrainingWorkoutsRoutes = require('./src/routes/weightTrainingWorkouts')
app.use('/api/weightTrainingWorkouts', weightTrainingWorkoutsRoutes)