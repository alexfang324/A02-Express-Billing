const Product = require("../models/Product.js");

class ProductOps {
  ProductOps() {}

  async getAllProducts() {
    const products = await Product.find({});
    return products;
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    return product;
  }
}

module.exports = ProductOps;
