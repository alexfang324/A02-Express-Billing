const mongoose = require('mongoose');
const { clientSchema } = require('./Client');
const { invoiceDetailSchema } = require('./InvoiceDetail');

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.Now },
    dueDate: { type: Date, required: true },
    invoiceClient: { type: clientSchema, required: true },
    products: { type: [invoiceDetailSchema], required: true }
  },
  { collection: 'invoices' }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
