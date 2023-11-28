const ProductOps = require('../data/ProductOps');

const _productOps = new ProductOps();

exports.Index = async function (req, res) {
  let products = await _productOps.getAllProducts();
  res.render('product-index', {
    title: 'Products',
    products
  });
};
