import HistoriaClinica from '../models/HistoriaClinica.js'
import PDFDocument from 'pdfkit'

export const crearHistoria = async (req, res) => {
  const { nombreMascota, raza, edad, documento, detalle } = req.body
  try {
    const existe = await HistoriaClinica.findOne({ documento })
    if (existe) {
      return res.status(400).json({ msg: 'Ya existe una historia con ese documento' })
    }

    const nuevaHistoria = new HistoriaClinica({ nombreMascota, raza, edad, documento, detalle })
    await nuevaHistoria.save()

    res.status(201).json({ msg: 'Historia clínica guardada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al guardar historia' })
  }
}

export const obtenerHistoria = async (req, res) => {
  const { documento } = req.params
  try {
    const historia = await HistoriaClinica.findOne({ documento })
    if (!historia) return res.status(404).json({ msg: 'No se encontró la historia' })

    res.json(historia)
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar historia' })
  }
}

export const descargarPDF = async (req, res) => {
  const { documento } = req.params
  try {
    const historia = await HistoriaClinica.findOne({ documento })
    if (!historia) return res.status(404).json({ msg: 'No se encontró la historia' })

    const doc = new PDFDocument()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=historia-${documento}.pdf`)
    doc.pipe(res)

    doc.fontSize(18).text('Historia Clínica Veterinaria', { align: 'center' })
    doc.moveDown()
    doc.fontSize(14).text(`Nombre: ${historia.nombreMascota}`)
    doc.text(`Raza: ${historia.raza}`)
    doc.text(`Edad: ${historia.edad}`)
    doc.text(`Documento: ${historia.documento}`)
    doc.moveDown()
    doc.text(`Detalles clínicos:\n${historia.detalle}`, {
      lineGap: 5
    })

    doc.end()
  } catch (error) {
    res.status(500).json({ msg: 'Error al generar PDF' })
  }
}
