import express from 'express'
import { crearHistoria, obtenerHistoria, descargarPDF } from '../controllers/historiasController.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verificarToken, crearHistoria)
router.get('/:documento', verificarToken, obtenerHistoria)
router.get('/:documento/pdf', verificarToken, descargarPDF)

export default router
