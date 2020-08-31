const Users = require('../models/users');
const { createToken } = require('../helpers/token')

module.exports = {
  getAllData : (req, res) => {
    Users.find()
    .then(result => {
      res.send({
        message: 'get All data',
        result
      })
    })
    .catch(error => {
      console.log(error)
      res.send({
        message: 'failed'
      })
    })
  },
  addOne: (req, res) => {
    const { fullname, username, email, phone, password, address, role } = req.body

    Users.create({
      fullname, 
      username,
      email, 
      phone,
      password,
      address,
      role
    }, (error, result) => {
      if(error) {
        res.status(400).json({
          message: 'error'
        })
      }
      else {
        res.status(200).json({
          message: 'success add user',
          result
        }) 
      }
    })
  },
  // fungsi login - generate token
  // createToken
  // login berhasil => kasih token
  //  klao login ga berhasil => response gagal
  login: async (req, res) => {
    try{
      //  find one
      const registeredUser = await Users.findOne({email: res.body.email}) 
      // sukses : obj / gagal : null
      // check password
      if(registeredUser.password === registeredUser.body.password){
        const dataUser = {
          id: registeredUser._id,
          username: registeredUser.username, 
          email: registeredUser.email
        }
        // user login +. kasih token
        const token = createToken(dataUser)
        console.log(token)

        res.status(200).json({
          message: 'Selamat datang',
          token,
          user: dataUser
        })
      } else {
        res.status(400).json({
          message: 'password salah'
        })
      }
    }
    catch(error) {
      console.log(error)
      res.status(500).json({
        message: 'internal server errror'
      })
    }

    // login gagal => response gagal
  },
  deleteUser: async (req, res) => {
    try{
      const deleteOneUser = await Users.findOneAndDelete({
        _id:req.params.id
      })
      if(deleteOneUser){
        res.status(200).json({
          message: "User deleted",
        })
      } else{
        res.status(400).json({
          message: "User is not deleted"
        })
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({
        message: "Invalid Server Error"
      })
    }
  },
  updateUser : async (req, res) => {
    try {
        const user = await Users.findOneAndUpdate({_id: req.params.id}, {...req.body})
        if(user){
            res.status(200).json({
                message: `success edit User with ${req.params.id}`,
            })
        } else {
            res.status(400).json({
                message: `failed edit User with ${req.params.id}`,
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: `Internal server error`,
        })
    }
  
}

}