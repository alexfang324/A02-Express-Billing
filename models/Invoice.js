const mongoose = require('mongoose');
const { productSchema } = require('./Product');
const { clientSchema } = require('./Client');

const invoiceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.Now },
    dueDate: { type: Date, required: true },
    client: clientSchema,
    products: { type: [productSchema], required: true }
  },
  { collection: 'invoices' }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
