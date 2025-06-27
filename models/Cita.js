import mongoose from 'mongoose'

const citaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mascota: {
    type: String,
    required: true
  },
  fecha: {
    type: String, // o Date si deseas validación estricta
    required: true
  },
  sucursal: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Cita', citaSchema)
