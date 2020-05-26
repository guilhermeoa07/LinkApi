const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

require('./database/Database')(process.env.DBURL)
const user = require('./routes/user')
const webhook = require('./routes/webhook')
const piperdrive = require('./routes/pipedriver')
const relatorios = require('./routes/relatorios')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send({
    Version: 1.0,
    Message: 'Integration'
  })
})

app.use('/user', user)
app.use('/webhook', webhook)
app.use('/piperdrive', piperdrive)
app.use('/relatorio', relatorios)

module.exports = app
