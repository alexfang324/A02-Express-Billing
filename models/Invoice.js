const mongoose = require('mongoose');
const { clientSchema } = require('./Client');
const { productDataSchema } = require('./ProductData');

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.Now },
    dueDate: {
      type: Date,
      required: true,
      validate: [dateValidator, 'dueDate must be later than the invoice date']
    },
    invoiceClient: { type: clientSchema, required: true },
    products: { type: [productDataSchema], required: true }
  },
  { collection: 'invoices' }
);

// validator function that returns false when invoiceDate is later than dueDate
function dateValidator(value) {
  return this.invoiceDate < value;
}

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = { Invoice };
