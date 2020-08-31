const express = require('express');
const app = express()
const passport = require('passport')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const db = require('./config/db')

const productsRouter = require('./routes/product')
const productsImagesRouter = require('./routes/products_images')
const usersRouter  = require('./routes/users')
const cartsRouter = require('./routes/carts')
const transactionsRouter = require('./routes/transaction')

// use strategies from our config

require('./config/strategies').strategies()
app.use(cors())
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

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// FACEBOOK AUTHENTICATE
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app.get('/auth/facebook/callback', passport.authenticate('facebook'),
  function(req, res) {
    // successful authentification, redirect home
    console.log(req.user)
    res.json({
      message: 'welcome'
    })
  });

  // END FACEBOOK AUTHENTICATE

// Google Authenticate
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> console.log('we are connected'));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})