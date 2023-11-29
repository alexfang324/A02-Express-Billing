const ProductOps = require("../data/ProductOps");
const Product = require("../models/Product");

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

exports.Create = async function (req, res) {
  res.render("product-form", {
    title: "Create Product",
    errorMessage: "",
    product: {},
  });
};

exports.CreateProduct = async function (req, res) {
  //create a product schema object using form data
  let formObj = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  //try to create a product object and add to database
  response = await _productOps.createProduct(formObj);

  // if no errors, it was created and save to db successfully
  if (response.errorMsg == "") {
    let products = await _productOps.getAllProducts();
    res.render("product-index", {
      title: "Products",
      products,
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    res.render("product-form", {
      title: "Create Product",
      product: response.obj,
      errorMessage: response.errorMsg,
    });
  }
};

exports.Edit = async function (req, res) {
  const id = req.params.id;
  const product = await _productOps.getProductById(id);
  res.render("product-form", {
    id,
    title: "Edit Product",
    errorMessage: "",
    product,
  });
};

exports.EditProduct = async function (req, res) {
  let formObj = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  const id = req.params.id;
  //try to create a product object and add to database
  response = await _productOps.updateProductById(id, formObj);

  // if no errors, it was created and save to db successfully
  if (response.errorMsg == "") {
    let products = await _productOps.getAllProducts();
    res.render("product-index", {
      title: "Products",
      products,
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    res.render("product-form", {
      id,
      title: "Create Product",
      product: response.obj,
      errorMessage: response.errorMsg,
    });
  }
};
