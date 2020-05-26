const { blingRequest } = require('../handlers/requestHandle')
const Pipedrive = require('../models/pipedrive')

exports.post = async (req, res, next) => {
  try {
    const current = req.body.current

    if (current.status === 'won') {
      const jsonToXml = {
        numero: current.id,
        cliente: {
          nome: current.person_name
        },
        parcela: {
          vlr: current.value
        },
        obs_internas: 'Webhook'
      }

      await blingRequest(jsonToXml, 'pedido')

      const jsonToSave = {
        creator_user_id: current.creator_user_id,
        idTransaction: current.id,
        title: current.title,
        status: current.status,
        value: current.value,
        currency: current.currency,
        won_time: current.won_time,
        person_name: current.person_name,
        org_name: current.org_name
      }

      await Pipedrive.create(jsonToSave)
    }

    res.status(201).send({
      message: 'Requisição recebida com sucesso!',
      body: req.body
    })
  } catch (error) {
    res.status(400).send({
      message: 'Erro ao receber a requisição.'
    })
  }

}
