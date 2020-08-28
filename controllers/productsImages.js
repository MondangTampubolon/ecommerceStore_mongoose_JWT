const ProductsImages = require('../models/productsImages');
const Products = require('../models/products');

module.exports = {
  getAllData : async (req, res) => { 
    try {
      const productsImages = await ProductsImages.find({}).populate('id_product')
      if(productsImages){
        res.status(200).json({
          message: 'Success to get All data',
          productsImages
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
addOne: async (req,res) => {
  try {
   
    const newProductsImages = await ProductsImages.create(
     {...req.body}
    )
   const product = await Products.findOneAndUpdate(
     {_id: req.body.id_product},
     {$push:{images:newProductsImages._id}},
     {new: true}
   )
   res.status(200).send({
     message: 'success',
     product
   })
  } catch (error) {
    console.log(error)
  }
}
}
