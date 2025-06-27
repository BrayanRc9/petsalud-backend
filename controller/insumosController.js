import Insumo from '../models/Insumo.js'

export const crearInsumo = async (req, res) => {
  const { nombre, cantidad, unidad } = req.body
  try {
    const nuevo = new Insumo({
      nombre,
      cantidad,
      unidad,
      creadoPor: req.usuario.id
    })
    await nuevo.save()
    res.status(201).json({ msg: 'Insumo registrado' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al registrar insumo' })
  }
}

export const obtenerInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find({ creadoPor: req.usuario.id })
    res.json(insumos)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener insumos' })
  }
}

export const eliminarInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findById(req.params.id)
    if (!insumo || insumo.creadoPor.toString() !== req.usuario.id) {
      return res.status(403).json({ msg: 'No autorizado o no encontrado' })
    }

    await insumo.deleteOne()
    res.json({ msg: 'Insumo eliminado' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar insumo' })
  }
}
