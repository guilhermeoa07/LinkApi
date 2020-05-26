const Pipedriver = require('../models/pipedrive')
const { blingRequest } = require('../handlers/requestHandle')
const { productToOder } = require('../handlers/productHandle')
const Product = require('../models/products')

async function checkOrder(data, productsToOder) {
  try {
    data.forEach(async value => {
      const registerOrder = await Pipedriver.find({
        idTransaction: value.id
      })

      const products = productsToOder.map(product => {
        if (value.id == product.idOrder) {
          return product.product
        }
      }).filter((x) => {
        return x !== undefined && x != ''
      })

      if (products != '') {
        const itens = await productToOder(products)

        const itensForXML = products.map(value => {
          return {
            codigo: value.idProduct,
            descricao: value.name,
            qtde: value.quantity,
            vlr_unit: value.valor
          }
        })

        if (registerOrder == '') {
          await Pipedriver.create({
            creator_user_id: value.creator_user_id.id,
            idTransaction: value.id,
            title: value.title,
            status: value.status,
            value: value.value,
            currency: value.currency,
            won_time: value.won_time,
            person_name: value.person_name,
            org_name: value.org_name,
            products: itens
          })
        }

        const jsonToXml = {
          numero: value.id,
          cliente: {
            nome: value.person_name
          },
          parcela: {
            vlr: value.value
          },
          itens: itensForXML.map(value => {
            return {
              item: {
                ...value
              }
            }
          }),
          obs_internas: 'ByPipeDriver'
        }

        itensForXML.forEach(async value => {
          await blingRequest(value, 'produto', 'POST')
        })

        await blingRequest(jsonToXml, 'pedido', 'POST')
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { checkOrder }