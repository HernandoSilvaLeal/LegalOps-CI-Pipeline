const mongoose = require('mongoose');
const config = require('./config');

async function connectDB() {
  try {
    await mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
}

module.exports = connectDB;
