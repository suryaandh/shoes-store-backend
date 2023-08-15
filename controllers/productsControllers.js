const Product = require('../models/Product')

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body)
    try {
      await newProduct.save()
      res.status(200).json("product created")
    } catch (error) {
      res.status(200).json("failed to create product")
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const product = await Product.find().sort({ createdAt: -1 })
      res.status(200).json(product)
    } catch (error) {
      res.status(200).json("failed to create product")
    }
  },

  getProduct: async (req, res) => {
    const productId = req.params.id
    try {
      const product = await Product.findById(productId)
      const { __v, createdAt, ...productData } = product._doc
      res.status(200).json(productData)
    } catch (error) {
      res.status(200).json("failed to create product")
    }
  },

  searchProduct: async (req, res) => {
    try {
      const results = await Product.aggregate(
        [
          {
            $search: {
              index: "sneakers",
              text: {
                query: req.params.key,
                path: {
                  wildcard: "*"
                }
              }
            }
          }
        ]
      )
      res.status(200).json(results)
    } catch (error) {
      res.status(200).json("failed to create product")
    }
  }
}