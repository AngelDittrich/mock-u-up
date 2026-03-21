const WeightTrainingWorkout = require('../models/weightTrainingWorkout');

exports.createWeightTrainingWorkout = async (req, res) => {
  try {
    const data = await WeightTrainingWorkout.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear weightTrainingWorkout', error: error.message });
  }
};

exports.getWeightTrainingWorkouts = async (req, res) => {
  try {
    const records = await WeightTrainingWorkout.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener weightTrainingWorkouts', error: error.message });
  }
};

exports.getWeightTrainingWorkoutById = async (req, res) => {
  try {
    const record = await WeightTrainingWorkout.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener weightTrainingWorkout', error: error.message });
  }
};

exports.updateWeightTrainingWorkout = async (req, res) => {
  try {
    const record = await WeightTrainingWorkout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar weightTrainingWorkout', error: error.message });
  }
};

exports.deleteWeightTrainingWorkout = async (req, res) => {
  try {
    const record = await WeightTrainingWorkout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar weightTrainingWorkout', error: error.message });
  }
};
