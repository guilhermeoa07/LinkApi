const mongoose = require('mongoose')

const SchemaProduct = new mongoose.Schema({
  id_pipedriver: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  item_price: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('Product', SchemaProduct)

module.exports = Product