const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/productController");

productRouter.get("/", ProductController.Index);
// productRouter.get('/', ProductController.Detail);

module.exports = productRouter;
