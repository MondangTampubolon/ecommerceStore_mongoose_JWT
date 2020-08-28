const Transactions = require('../models/transactions');

module.exports = {
  getAll : async (req, res) => {
    try{
      const transactions = await Transactions.find({})
      .populate({path: 'id_user', select: 'username'})
      .populate({path: 'id_products', select: 'product_name'})
      .populate({path: 'id_cart', select: '_id'})

      if(transactions){
        res.send({
          message: 'get all data',
          data: transactions
        })
      } else {
        res.status(400).json({
          message: 'failed to get data'
        })
      }
    }
    catch(error){
      console.log(error);
      res.status(500).json({
        message: "internal server error"
      })
    }
  },
  createOne: async (req, res) => {
    try{
      const {id_user, id_products, id_cart, statusTransaction, totalPrice} = req.body
      const newTransactions = await Transactions
      .create({
        id_user,
        id_products,
        id_cart,
        statusTransaction,
        totalPrice
      })
      if(newTransactions) {
        res.status(200).json({
          message: `success add transaction`,
          newTransactions
        })
      } else {
        res.status(400).json({
          message: `failed`
        })
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  }