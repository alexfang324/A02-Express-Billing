const mongoose = require('mongoose');
const { productSchema } = require('./Product');
const { clientSchema } = require('./Client');

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.Now },
    dueDate: { type: Date, required: true },
    invoiceClient: { type: clientSchema, required: true },
    products: { type: [productSchema], required: true }
  },
  { collection: 'invoices' }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
