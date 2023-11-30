const Product = require('../models/Product.js');

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

  async createProduct(productObj) {
    try {
      //if form data is invalid, return response with error
      const error = await productObj.validateSync();
      if (error) {
        const response = {
          obj: productObj,
          errorMsg: error.message
        };
        return response;
      }

      // Model is valid, save it to db
      const result = await productObj.save();
      const response = {
        obj: result,
        errorMsg: ''
      };
      return response;
    } catch (error) {
      const response = {
        obj: productObj,
        errorMsg: error.message
      };
      return response;
    }
  }

  async updateProductById(id, productObj) {
    try {
      //if form data is invalid, return response with error
      const error = await productObj.validateSync();
      if (error) {
        const response = {
          obj: productObj,
          errorMsg: error.message
        };
        return response;
      }

      // Model is valid, update it to the document and save it to db
      const result = await productObj.save();
      const response = {
        obj: result,
        errorMsg: ''
      };
      return response;
    } catch (error) {
      const response = {
        obj: productObj,
        errorMsg: error.message
      };
      return response;
    }
  }

  async deleteProductById(id) {
    let result = await Product.findByIdAndDelete(id);
    return result;
  }
}

module.exports = ProductOps;
