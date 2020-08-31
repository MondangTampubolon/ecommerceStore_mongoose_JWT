const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema

const usersSchema = new Schema({
  providerId: {
    type: String,
    required: false
  },
  provider: {
    type: String,
    required: false
  },
  fullname: {
    type: String,
   
  },
  username: {
    type: String,
   
  },
  email: {
    type: String,
  
  },
  phone: {
    type: Number,
   
  },
  password: {
    type: String,
  
  },
  address: {
    type: String,
  
  },
  role: {
    type: String,
    default: 'User',
    required: false
  }
}, {
  timestamps: true
})

usersSchema.plugin(findOrCreate);

const Users = mongoose.model('users', usersSchema)

module.exports = Users