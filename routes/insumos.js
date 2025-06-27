import express from 'express'
import { crearInsumo, obtenerInsumos, eliminarInsumo } from '../controllers/insumosController.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verificarToken, crearInsumo)
router.get('/', verificarToken, obtenerInsumos)
router.delete('/:id', verificarToken, eliminarInsumo)

export default router
