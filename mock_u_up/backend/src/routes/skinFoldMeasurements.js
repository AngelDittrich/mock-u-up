const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createSkinFoldMeasurement,
  getSkinFoldMeasurements,
  getSkinFoldMeasurementById,
  updateSkinFoldMeasurement,
  deleteSkinFoldMeasurement
} = require('../controllers/skinFoldMeasurementController');

router.use(auth);

router.route('/')
  .post(createSkinFoldMeasurement)
  .get(getSkinFoldMeasurements);

router.route('/:id')
  .get(getSkinFoldMeasurementById)
  .put(updateSkinFoldMeasurement)
  .delete(deleteSkinFoldMeasurement);

module.exports = router;
