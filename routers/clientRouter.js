const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");

clientRouter.get("/", clientController.Index);

clientRouter.get("/create", clientController.Create);
clientRouter.post("/create", clientController.CreateClient);

module.exports = clientRouter;
