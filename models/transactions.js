const mongoose = require('mongoose');

const Schema = mongoose.Schema

const transactionsSchema  = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  id_products: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  id_cart: {
    type: Schema.Types.ObjectId,
    ref: 'carts',
    required: true
  },
  statusTransaction: {
    type: Boolean,
    required: true
  },
  totalPrice:{
    type: Number,
    required: true
  }
}, {timestamps: true})

const Transactions = mongoose.model('transactions', transactionsSchema)

module.exports = Transactions;