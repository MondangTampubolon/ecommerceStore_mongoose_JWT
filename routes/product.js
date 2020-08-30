const route = require('express').Router();
// const { verifyToken } = require('../helpers/token')

const {
  getAllData,
  addOne, 
  deleteProduct,
  updateProduct
} = require('../controllers/products')

route.get('/product', getAllData)
route.post('/product', addOne)
route.delete('/product/delete/:id', deleteProduct)
route.put('/product/update/:id', updateProduct)

module.exports = route