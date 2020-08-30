const Cart = require('../models/carts');

module.exports = {
  getAllData : async (req, res) => { 
    try {
      const cart = await Cart.find({})
      .populate({path:'id_product', select:'product_name'})
      .populate({path: 'id_users', select: 'username'})
      
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
    },
    deleteCart: async (req, res) => {
      try{
        const deleteCart = await Cart.findOneAndDelete({
          _id:req.params.id
        })
        if(deleteCart){
          res.status(200).json({
            message: "Cart deleted",
          })
        } else{
          res.status(400).json({
            message: "Cart not deleted"
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
    updateCart : async (req, res) => {
      try {
          const cart = await Cart.findOneAndUpdate({_id: req.params.id}, {...req.body})
          if(cart){
              res.status(200).json({
                  message: `success edit cart with ${req.params.id}`,
              })
          } else {
              res.status(400).json({
                  message: `failed edit cart with ${req.params.id}`,
              })
          }
      }
      catch(error){
          res.status(500).json({
              message: `Internal server error`,
          })
      }
   },
}