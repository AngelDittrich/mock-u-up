const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createCalisthenicsWorkout,
  getCalisthenicsWorkouts,
  getCalisthenicsWorkoutById,
  updateCalisthenicsWorkout,
  deleteCalisthenicsWorkout
} = require('../controllers/calisthenicsWorkoutController');

router.use(auth);

router.route('/')
  .post(createCalisthenicsWorkout)
  .get(getCalisthenicsWorkouts);

router.route('/:id')
  .get(getCalisthenicsWorkoutById)
  .put(updateCalisthenicsWorkout)
  .delete(deleteCalisthenicsWorkout);

module.exports = router;
