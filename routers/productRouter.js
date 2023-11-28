const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");

productRouter.get("/", ProductController.Index);
productRouter.get("/:id", ProductController.Detail);

module.exports = productRouter;
