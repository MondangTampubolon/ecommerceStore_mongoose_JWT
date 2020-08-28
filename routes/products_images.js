const route = require('express').Router();


const {
  getAllData,
  addOne
} = require('../controllers/productsImages')

route.get('/products_images', getAllData)
route.post('/products_images', addOne)

module.exports = route