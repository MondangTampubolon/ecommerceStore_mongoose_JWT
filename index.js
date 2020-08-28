const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser')

const productsRouter = require('./routes/Product')
const productsImagesRouter = require('./routes/products_images')
const usersRouter  = require('./routes/users')
const cartsRouter = require('./routes/carts')
const transactionsRouter = require('./routes/transaction')

const app = express()

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('welcome')
})

app.use('/', productsRouter)
app.use('/', usersRouter)
app.use('/', cartsRouter)
app.use('/', productsImagesRouter)
app.use('/', transactionsRouter )

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> console.log('we are connected'));

app.listen(8000, () => {
  console.log('connected')
})