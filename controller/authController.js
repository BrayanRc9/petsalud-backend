import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registrar = async (req, res) => {
  const { nombre, email, password } = req.body
  try {
    const existeUsuario = await Usuario.findOne({ email })
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El usuario ya está registrado' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const nuevoUsuario = new Usuario({ nombre, email, password: hash })
    await nuevoUsuario.save()

    res.status(201).json({ msg: 'Usuario creado correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor' })
  }
}

export const login = async (req, res) => {
  const { usuario, password } = req.body
  try {
    const usuario = await Usuario.findOne({ usuario })
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' })
    }

    const valid = await bcrypt.compare(password, usuario.password)
    if (!valid) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' })
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ msg: 'Error en login' })
  }
}
