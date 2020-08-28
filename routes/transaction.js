const route = require('express').Router();

const {
  getAll,
  createOne
} = require('../controllers/transactions')


route.get('/transactions', getAll)
route.post('/transactions', createOne)

module.exports = route