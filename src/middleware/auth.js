const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ Error: 'Nenhum token informado.' })

  const parts = authHeader.split(' ')
  if (!parts.length === 2) return res.status(401).send({ Error: 'Token incompleto ou malformado.' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ Error: 'Token invalido.' })

  jwt.verify(token, secret, (err, decode) => {
    if (err) return res.status(401).send({ Error: 'Token Invalido ou expirado.' })

    req.userId = decode.id
    next()
  })
}