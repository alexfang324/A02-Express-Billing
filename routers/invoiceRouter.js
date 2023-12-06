const express = require('express');
const invoiceRouter = express.Router();
const InvoiceController = require('../controllers/InvoiceController');

invoiceRouter.get('/', InvoiceController.Index);
invoiceRouter.get('/edit', InvoiceController.Create);
invoiceRouter.post('/edit', InvoiceController.CreateInvoice);
module.exports = invoiceRouter;
