const mongoose = require('mongoose');
const { productSchema } = require('./Product');

const productDataSchema = mongoose.Schema({
  product: { type: productSchema, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity can't be negative"]
  }
});

const ProductData = mongoose.model('ProductData', productDataSchema);

module.exports = { ProductData, productDataSchema };
