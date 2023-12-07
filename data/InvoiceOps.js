const Invoice = require('../models/Invoice.js');

class InvoiceOps {
  InvoiceOps() {}

  async getAllInvoices() {
    const invoices = await Invoice.find({}).sort({ name: 1 });
    return invoices;
  }

  async getInvoiceById(id) {
    if (!id || id === undefined || id === '') {
      return null;
    }

    const invoice = await Invoice.findById(id);
    return invoice;
  }

  async createInvoice(invoiceObj) {
    try {
      //if form data is invalid, return response with error
      const error = await invoiceObj.validateSync();
      if (error) {
        const response = {
          obj: invoiceObj,
          errorMsg: error.message
        };
        return response;
      }

      // Model is valid, save it to db
      const result = await invoiceObj.save();
      const response = {
        obj: result,
        errorMsg: ''
      };
      return response;
    } catch (error) {
      const response = {
        obj: invoiceObj,
        errorMsg: error.message
      };
      return response;
    }
  }

  async deleteInvoiceById(id) {
    let result = await Invoice.findByIdAndDelete(id);
    return result;
  }
}

module.exports = InvoiceOps;
