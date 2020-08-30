const route = require('express').Router();

const {
  getAll,
  createOne,
  updateTransactions
} = require('../controllers/transactions')


route.get('/transactions', getAll)
route.post('/transactions', createOne)
route.put('/transactions/update/:id', updateTransactions)

module.exports = route