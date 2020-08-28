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
      const {product_name, description, stock, price} = req.body
      const newProducts = await Products.create({
        product_name,
        description,
        stock,
        price
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
    } catch (error) {
      console.log(error)
    }
  }
}