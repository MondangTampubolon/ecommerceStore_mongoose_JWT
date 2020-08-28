const Cart = require('../models/carts');

module.exports = {
  getAllData : async (req, res) => { 
    try {
      const cart = await Cart.find({})
      .populate('id_product')
      .populate('id_users')
      
      if(cart){
        res.status(200).json({
          message: 'Success to get All data',
          cart
        })
      } else {
        res.status(400).json({
          messgae: 'Failed to get all data'
        })
      }
    }
  
  catch(error){
    console.log(error)
    res.status(500).json({
      messgae: 'Internal server Error'
    })
  }
},
addCart: async (req,res) => {
  try {
   
    const {id_users, id_product, quantity, status_cart} = req.body
            const newCart = await Cart.create({
                id_users, 
                id_product, 
                quantity, 
                status_cart
            })
            if(newCart){
                res.status(200).json({
                    message: "Cart Added",
                    newCart
                })
            } else {
                res.status(400).json({
                    message: "Failed to Create Cart"
                })
            }
        }
        catch(error){
            console.log(error);
            res.send({
                message: "Internal Server Error"
            })
        }
    }
}