import mongoose from 'mongoose'

const historiaClinicaSchema = new mongoose.Schema({
  nombreMascota: {
    type: String,
    required: true
  },
  raza: String,
  edad: String,
  documento: {
    type: String,
    required: true,
    unique: true
  },
  detalle: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('HistoriaClinica', historiaClinicaSchema)
