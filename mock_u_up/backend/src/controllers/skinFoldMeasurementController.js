const SkinFoldMeasurement = require('../models/skinFoldMeasurement');

exports.createSkinFoldMeasurement = async (req, res) => {
  try {
    const data = await SkinFoldMeasurement.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear skinFoldMeasurement', error: error.message });
  }
};

exports.getSkinFoldMeasurements = async (req, res) => {
  try {
    const records = await SkinFoldMeasurement.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener skinFoldMeasurements', error: error.message });
  }
};

exports.getSkinFoldMeasurementById = async (req, res) => {
  try {
    const record = await SkinFoldMeasurement.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener skinFoldMeasurement', error: error.message });
  }
};

exports.updateSkinFoldMeasurement = async (req, res) => {
  try {
    const record = await SkinFoldMeasurement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar skinFoldMeasurement', error: error.message });
  }
};

exports.deleteSkinFoldMeasurement = async (req, res) => {
  try {
    const record = await SkinFoldMeasurement.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar skinFoldMeasurement', error: error.message });
  }
};
