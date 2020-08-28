const route = require('express').Router();



const{
  getAllData,
  addCart
} = require('../controllers/carts')


route.get('/carts', getAllData)
route.post('/carts', addCart)

module.exports = route