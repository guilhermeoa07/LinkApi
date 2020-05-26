const { pipedriveRequest, blingRequest } = require('../handlers/requestHandle')
const { registerProduct } = require('../handlers/productHandle')
const { checkOrder } = require('../handlers/orderHandle')
const Pipedrive = require('../models/pipedrive')


exports.get = async (req, res, next) => {
  try {
    const requestPipedrive = await pipedriveRequest('GET', '/deals/')
    const data = requestPipedrive.data.data

    await registerProduct(data)

    await checkOrder(data)

    res.status(201).send({
      message: 'Requisição recebida com sucesso!',
      body: data
    })
  } catch (error) {
    res.status(400).send({
      message: 'Erro ao receber a requisição.',
      response: error
    })
  }

}
