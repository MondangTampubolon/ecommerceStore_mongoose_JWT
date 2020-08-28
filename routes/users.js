const route = require('express').Router()

const { verifyToken } = require('../helpers/token')

const {
  getAllData,
  addOne,
  login
} = require('../controllers/users')

route.get('/users', getAllData)
route.post('/users', addOne)
route.post('/users/login', login)

module.exports = route

