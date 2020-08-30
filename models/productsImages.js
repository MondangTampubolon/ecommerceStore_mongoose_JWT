const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productsImagesSchema = new Schema({
  id_product: {
    type: String,
    required: true,
    ref: 'products',
  },
  url_images: {
    type: String,
    required: true
  },
}, {timestamps: true})

const ProductsImages = mongoose.model('productsImages', productsImagesSchema)

module.exports = ProductsImages;
