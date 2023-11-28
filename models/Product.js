const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: 'string' },
    price: { type: Number, required: true },
    weight: { type: Number },
    unit: { type: String }
  },
  { collection: 'products' }
);

const Product = mongoose.model('Product', productSchema);

//Insert initial data into collection
Product.insertMany([
  { name: 'Tea', price: 10, weight: 100, unit: 'g' },
  { name: 'Cookie', price: '4' }
]);

module.exports = Product;
