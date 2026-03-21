const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createBodyMeasurement,
  getBodyMeasurements,
  getBodyMeasurementById,
  updateBodyMeasurement,
  deleteBodyMeasurement
} = require('../controllers/bodyMeasurementController');

router.use(auth);

router.route('/')
  .post(createBodyMeasurement)
  .get(getBodyMeasurements);

router.route('/:id')
  .get(getBodyMeasurementById)
  .put(updateBodyMeasurement)
  .delete(deleteBodyMeasurement);

module.exports = router;
