const app = require('./app')
const { normalizaPort } = require('./handlers/normalizaPort')
const { pipedriveRequest } = require('./handlers/requestHandle')
const { registerProduct } = require('./handlers/productHandle')
const { checkOrder } = require('./handlers/orderHandle')

const port = normalizaPort(process.env.PORT || '3000')

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

async function Start() {
  const requestPipedrive = await pipedriveRequest('GET', '/deals/')
  const data = requestPipedrive.data.data

  const product = await registerProduct(data)

  await checkOrder(data, product)

  console.log('Atualização inicial')
}
Start()