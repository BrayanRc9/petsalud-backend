import mongoose from 'mongoose'; // ESTA LÍNEA ES CLAVE ✅

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, required: true, unique: true },
  password: String,
  rol: {
    type: String,
    enum: ['cliente', 'medico', 'admin'],
    default: 'cliente'
  }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);
