const route = require('express').Router()
const { jwtAuthenticate } = require('../helpers/auth')


const {
  getAllData,
  addOne,
  login,
  updateUser,
  deleteUser
} = require('../controllers/users')

route.get('/users', getAllData);
route.post('/users', addOne);
route.post('/users/login', login);
route.delete('/users/delete/:id', deleteUser);
route.put('/users/:id', jwtAuthenticate, updateUser);

module.exports = route

