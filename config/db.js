import mongoose from 'mongoose'

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error en conexión a MongoDB: ${error.message}`)
    process.exit(1) // Detiene el servidor si falla
  }
}

export default conectarDB
