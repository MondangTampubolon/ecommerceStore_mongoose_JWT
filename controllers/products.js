const Products = require('../models/products');

module.exports = {
  getAllData : async (req, res) => {
    try { 
      const products = await Products.find().populate({path: 'images', select: 'url_images'})
      if(products){
        res.status(200).json({
          message: 'Success to get All data',
          products
        })
      } else {
        res.status(400).json({
          message: "Failed to get all data"
        })
      }
    }
    catch(error){
      res.status(500).json({
        message: "Internal Server Error"
      })
    }

  },
  addOne: async (req, res) => {
    try {
      const newProducts = await Products.create({
        ...req.body
      })
     
      if(newProducts){
        res.send({
          message: 'success',
          newProducts,
        })
      } else {
        res.send({
          message: 'error'
        })
      }
    } 
    catch (error) {
      console.log(error)
      res.send({
        message: 'error'
      })
    }
  },
  deleteProduct: async (req, res) => {
    try{
      const deleteOneProduct = await Products.findOneAndDelete({
        _id:req.params.id
      })
      if(deleteOneProduct){
        res.status(200).json({
          message: "Product deleted",
        })
      } else{
        res.status(400).json({
          message: "Product is not deleted"
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
  updateProduct : async (req, res) => {
    try {
        const product = await Products.findOneAndUpdate({_id: req.params.id}, {...req.body})
        if(product){
            res.status(200).json({
                message: `success edit Product with ${req.params.id}`,
            })
        } else {
            res.status(400).json({
                message: `failed edit Product with ${req.params.id}`,
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