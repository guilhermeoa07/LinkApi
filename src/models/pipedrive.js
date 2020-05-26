const mongoose = require('mongoose')

const SchemaPipedrive = new mongoose.Schema({
  creator_user_id: {
    type: String,
    required: true
  },
  idTransaction: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    select: false
  },
  status: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  won_time: {
    type: String,
  },
  person_name: {
    type: String,
  },
  org_name: {
    type: String,
  },
  products: [{
    idProduct: {
      type: String
    },
    value: {
      type: Number
    },
    quantity: {
      type: Number
    }
  }],
  createDate: {
    type: Date,
    default: Date.now
  }
})

const Pipedrive = mongoose.model('Pipedrive', SchemaPipedrive)

module.exports = Pipedrive