const Product = require('../models/Product.js');

class ProductOps {
  ProductOps() {}

  async getAllProducts() {
    const products = await Product.find({});
    return products;
  }
}

module.exports = ProductOps;
