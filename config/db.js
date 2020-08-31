const mongoose = require('mongoose')
require('dotenv').config()
// const url='mongodb+srv://mondang:rootroot@cluster0.3n5nb.mongodb.net/ImpactbyteStore';
// const url ='mongodb://localhost:27017/ImpactStore';


const url = process.env.DB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

module.exports = db;


