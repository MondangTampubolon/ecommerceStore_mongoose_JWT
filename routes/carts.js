const route = require('express').Router();



const{
  getAllData,
  addCart,
  deleteCart,
  updateCart
} = require('../controllers/carts')


route.get('/carts', getAllData)
route.post('/carts', addCart)
route.delete('/carts/delete/:id', deleteCart)
route.put('/carts/update/:id', updateCart)

module.exports = route