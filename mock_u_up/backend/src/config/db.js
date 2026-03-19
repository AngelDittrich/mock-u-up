const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB conectada: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a la base de datos: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
