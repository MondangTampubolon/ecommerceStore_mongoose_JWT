const route = require('express').Router();
// const { verifyToken } = require('../helpers/token')

const {
  getAllData,
  addOne, 
} = require('../controllers/products')

route.get('/product', getAllData)
route.post('/product', addOne)

module.exports = route