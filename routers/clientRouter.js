const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");

clientRouter.get("/", clientController.Index);

module.exports = clientRouter;
