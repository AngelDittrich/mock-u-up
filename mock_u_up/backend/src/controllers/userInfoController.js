const UserInfo = require('../models/userInfo');

exports.createUserInfo = async (req, res) => {
  try {
    const data = await UserInfo.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear userInfo', error: error.message });
  }
};

exports.getUserInfos = async (req, res) => {
  try {
    const records = await UserInfo.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener userInfo', error: error.message });
  }
};

exports.getUserInfoById = async (req, res) => {
  try {
    const record = await UserInfo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener userInfo', error: error.message });
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const record = await UserInfo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar userInfo', error: error.message });
  }
};

exports.deleteUserInfo = async (req, res) => {
  try {
    const record = await UserInfo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar userInfo', error: error.message });
  }
};
