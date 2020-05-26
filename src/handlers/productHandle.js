const Product = require('../models/products')
const { pipedriveRequest } = require('../handlers/requestHandle')

async function checkProduct(data) {
  try {
    const product = data.map(async value => {

      if (value.products_count > 0) {
        const productToParse = await pipedriveRequest('GET', `/deals/${value.id}/products`)

        return {
          idOrder: value.id,
          product: productToParse.data.data
        }
      }
    })

    const resolve = Promise.all(product)

    return (await resolve).filter(Boolean)
  } catch (error) {
    console.log(error)
  }
}

async function registerProduct(data) {
  const product = await checkProduct(data)
  let productToOrder = []

  if (product) {
    product.forEach(productForOrder => {
      productForOrder.product.forEach(async value => {
        productToOrder.push({
          idOrder: productForOrder.idOrder,
          product: {
            idProduct: value.id,
            name: value.name,
            valor: value.item_price,
            quantity: value.quantity,
          }
        })

        const asProduct = await Product.find({
          name: value.name
        })

        if (asProduct == '') {
          await Product.create({
            id_pipedriver: value.id,
            name: value.name,
            item_price: value.item_price
          }, function (err, small) {
            if (err) return console.log(err)
          })
        }
      })
    })
  }

  return productToOrder
}

async function productToOder(products) {
  return Promise.all(
    products.map(async (value) => {
      const mongoProduct = await Product.findOne({
        name: value.name
      })

      const productFinale = {
        idProduct: mongoProduct.id_pipedriver,
        value: value.valor,
        quantity: value.quantity
      }

      return productFinale
    })
  )

}

module.exports = { registerProduct, productToOder }