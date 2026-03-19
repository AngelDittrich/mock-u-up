const Measurement = require('../models/Measurement');

exports.createMeasurement = async (req, res) => {
  try {
    const data = await Measurement.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la medida', error: error.message });
  }
};

exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find({ userId: req.user.id });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las medidas', error: error.message });
  }
};

exports.getMeasurementById = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ _id: req.params.id, userId: req.user.id });
    if (!measurement) return res.status(404).json({ message: 'Medida no encontrada' });
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la medida', error: error.message });
  }
};

exports.updateMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!measurement) return res.status(404).json({ message: 'Medida no encontrada' });
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la medida', error: error.message });
  }
};

exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!measurement) return res.status(404).json({ message: 'Medida no encontrada' });
    res.json({ message: 'Medida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la medida', error: error.message });
  }
};
