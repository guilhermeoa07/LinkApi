const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

function generateToken(params = {}) {
  return jwt.sign(params, secret, {
    expiresIn: 432000
  })
}

exports.post = async (req, res) => {
  try {
    const user = await User.create(req.body)
    user.password = undefined
    return res.status(201).send({ User: { Id: user.id, Token: generateToken({ id: user.id }) } })
  } catch (err) {
    res.status(400).send({ Erro: err })
  }
}

exports.postAuthenticate = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user) return res.status(401).send({ Erro: 'Usuario não encontrado.' })

  if (!await bcrypt.compare(password, user.password)) return res.status(401).send({ Erro: 'Senha Invalida.' })

  user.password = undefined

  res.status(200).send({ User: { Usuario: user.name, Token: generateToken({ id: user.id }) } })
}