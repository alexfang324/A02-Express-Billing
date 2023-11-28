const ProductOps = require("../data/ProductOps");

const _productOps = new ProductOps();

exports.Index = async function (req, res) {
  let products = await _productOps.getAllProducts();
  res.render("product-index", {
    title: "Products",
    products,
  });
};

exports.Detail = async function (req, res) {
  let product = await _productOps.getProductById(req.params.id);
  res.render("product-detail", {
    title: "Product",
    product,
  });
};
