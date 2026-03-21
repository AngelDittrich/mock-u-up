const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createWeightTrainingWorkout,
  getWeightTrainingWorkouts,
  getWeightTrainingWorkoutById,
  updateWeightTrainingWorkout,
  deleteWeightTrainingWorkout
} = require('../controllers/weightTrainingWorkoutController');

router.use(auth);

router.route('/')
  .post(createWeightTrainingWorkout)
  .get(getWeightTrainingWorkouts);

router.route('/:id')
  .get(getWeightTrainingWorkoutById)
  .put(updateWeightTrainingWorkout)
  .delete(deleteWeightTrainingWorkout);

module.exports = router;
