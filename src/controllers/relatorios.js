const { blingRequest } = require('../handlers/requestHandle')
const Pipedrive = require('../models/pipedrive')

exports.getAll = async (req, res, next) => {
  try {
    console.log('datas ' + dateIni + '  ' + dateEnd)

    Contacts
    const data = await Pipedrive.aggregate(
      [
        {
          $group: {
            _id: "$createDate",
            total: {
              $sum: "$value"
            }
          }
        }
      ],
      function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      }
    )

    console.log('\n\n\n data')
    console.log(data)
    console.log('\n\n\n')
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

exports.get = async (req, res, next) => {
  try {
    const dateIni = req.body.dateIni
    const dateEnd = req.body.dateEnd

    console.log('datas ' + dateIni + '  ' + dateEnd)

    const data = await Pipedrive.find({ createDate: { $gte: dateIni, $lte: dateEnd } })

    const valueReturn = data.reduce((accumulator = 0, current) => {
      return accumulator += Number(current.value)
    }, 0)

    res.status(201).send({
      message: 'Requisição recebida com sucesso!',
      body: {
        Quantidade: data.length,
        ValorTotal: valueReturn
      }
    })
  } catch (error) {
    res.status(400).send({
      message: 'Erro ao receber a requisição.',
      response: error
    })
  }
}
