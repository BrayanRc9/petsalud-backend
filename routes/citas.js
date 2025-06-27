import express from 'express'
import { crearCita, obtenerCitas } from '../controllers/citasController.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verificarToken, crearCita)
router.get('/', verificarToken, obtenerCitas)

export default router
