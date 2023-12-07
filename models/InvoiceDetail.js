const mongoose = require('mongoose');
const { productSchema } = require('./Product');

const invoiceDetailSchema = mongoose.Schema({
  product: { type: productSchema, required: true },
  quantity: { type: Number, required: true }
});

const InvoiceDetail = mongoose.model('InvoiceDetail', invoiceDetailSchema);

module.exports = { InvoiceDetail, invoiceDetailSchema };
