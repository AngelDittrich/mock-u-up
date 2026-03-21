const BodyMeasurement = require('../models/bodyMeasurement');

exports.createBodyMeasurement = async (req, res) => {
  try {
    const data = await BodyMeasurement.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear bodyMeasurement', error: error.message });
  }
};

exports.getBodyMeasurements = async (req, res) => {
  try {
    const records = await BodyMeasurement.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener bodyMeasurements', error: error.message });
  }
};

exports.getBodyMeasurementById = async (req, res) => {
  try {
    const record = await BodyMeasurement.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener bodyMeasurement', error: error.message });
  }
};

exports.updateBodyMeasurement = async (req, res) => {
  try {
    const record = await BodyMeasurement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar bodyMeasurement', error: error.message });
  }
};

exports.deleteBodyMeasurement = async (req, res) => {
  try {
    const record = await BodyMeasurement.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar bodyMeasurement', error: error.message });
  }
};
