import Cita from '../models/Cita.js'

export const crearCita = async (req, res) => {
  const { mascota, fecha, sucursal } = req.body
  try {
    const nuevaCita = new Cita({
      usuario: req.usuario.id,
      mascota,
      fecha,
      sucursal
    })
    await nuevaCita.save()
    res.status(201).json({ msg: 'Cita agendada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al agendar cita' })
  }
}

export const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario.id }).sort({ fecha: 1 })
    res.json(citas)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener citas' })
  }
}
