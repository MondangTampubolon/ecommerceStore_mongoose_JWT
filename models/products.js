const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productsSchema = new Schema({
  product_name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "productsImages"
  }]
  
}, {timestamps: true})

const Products = mongoose.model('products', productsSchema)

module.exports = Products;