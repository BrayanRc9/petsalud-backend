import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'

import authRoutes from './routes/auth.js'
import citasRoutes from './routes/citas.js'
import insumosRoutes from './routes/insumos.js'
import historiasRoutes from './routes/historias.js'

dotenv.config()
conectarDB()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/citas', citasRoutes)
app.use('/api/insumos', insumosRoutes)
app.use('/api/historias', historiasRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))