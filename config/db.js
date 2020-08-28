const mongoose = require('mongoose')

// const url='mongodb+srv://mondang:rootroot@cluster0.3n5nb.mongodb.net/ImpactbyteStore';
const url ='mongodb://localhost:27017/ImpactStore';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

module.exports = db;

