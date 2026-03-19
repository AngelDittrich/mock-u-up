const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createMeasurement,
  getMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement
} = require('../controllers/measurementController');

router.use(auth);

router.route('/')
  .post(createMeasurement)
  .get(getMeasurements);

router.route('/:id')
  .get(getMeasurementById)
  .put(updateMeasurement)
  .delete(deleteMeasurement);

module.exports = router;