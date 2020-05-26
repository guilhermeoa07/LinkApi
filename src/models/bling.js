const mongoose = require('mongoose')

const SchemaBling = new mongoose.Schema({
  forDay: {
    date: {
      type: Date,
      require: true,
      unique: true
    },
    value: {
      type: Number
    }
  }
})

const Bling = mongoose.model('Bling', SchemaBling)

module.exports = Bling