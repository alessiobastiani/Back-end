// dbManager.js
import mongoose from 'mongoose';

class DBManager {
  static async connect() {
    try {
      await mongoose.connect('tu_url_de_conexion_a_MongoDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error de conexión a MongoDB:', error);
    }
  }
}

export default DBManager;