const CalisthenicsWorkout = require('../models/calisthenicsWorkout');

exports.createCalisthenicsWorkout = async (req, res) => {
  try {
    const data = await CalisthenicsWorkout.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear calisthenicsWorkout', error: error.message });
  }
};

exports.getCalisthenicsWorkouts = async (req, res) => {
  try {
    const records = await CalisthenicsWorkout.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener calisthenicsWorkouts', error: error.message });
  }
};

exports.getCalisthenicsWorkoutById = async (req, res) => {
  try {
    const record = await CalisthenicsWorkout.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener calisthenicsWorkout', error: error.message });
  }
};

exports.updateCalisthenicsWorkout = async (req, res) => {
  try {
    const record = await CalisthenicsWorkout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar calisthenicsWorkout', error: error.message });
  }
};

exports.deleteCalisthenicsWorkout = async (req, res) => {
  try {
    const record = await CalisthenicsWorkout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar calisthenicsWorkout', error: error.message });
  }
};
