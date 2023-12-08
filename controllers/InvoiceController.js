const { Invoice } = require('../models/Invoice');
const InvoiceOps = require('../data/InvoiceOps');
const ClientOps = require('../data/ClientOps');
const ProductOps = require('../data/ProductOps');

const _invoiceOps = new InvoiceOps();
const _clientOps = new ClientOps();
const _productOps = new ProductOps();

exports.Index = async function (req, res) {
  const invoices = await _invoiceOps.getAllInvoices();

  res.render('invoice-index', {
    title: 'Invoices',
    invoices,
    filterText: '',
    errorMessage: ''
  });
};

exports.Detail = async function (req, res) {
  const invoice = await _invoiceOps.getInvoiceById(req.params.id);
  let invoiceTotal = 0;
  invoice.products.forEach((product, i) => {
    invoiceTotal += product.unit_cost * invoice.quantities[i];
  });

  res.render('invoice-detail', {
    title: `Invoice - ${invoice.invoiceNumber}`,
    invoice,
    invoiceTotal
  });
};

exports.Create = async function (req, res) {
  const clientList = await _clientOps.getAllClients();
  const productList = await _productOps.getAllProducts();
  res.render('invoice-form', {
    title: 'Create Invoice',
    errorMessage: '',
    invoiceId: null,
    invoice: { products: [{}], quantities: [{}] },
    clientList,
    productList
  });
};

exports.CreateInvoice = async function (req, res) {
  const invoiceClient = await _clientOps.getClientById(req.body.clientId);
  const productIds = req.body['productId[]'];
  const quantities = req.body['quantity[]'];

  const products = await _invoiceOps.constructInvoiceProducts(productIds);

  let formObj = new Invoice({
    invoiceId: null,
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    dueDate: req.body.dueDate,
    invoiceClient,
    products,
    quantities
  });

  const response = await _invoiceOps.createInvoice(formObj);

  if (response.errorMsg == '') {
    const invoices = await _invoiceOps.getAllInvoices();
    res.render('invoice-index', {
      title: 'Invoices',
      invoices,
      filterText: '',
      errorMessage: ''
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    const clientList = await _clientOps.getAllClients();
    const productList = await _productOps.getAllProducts();

    res.render('invoice-form', {
      title: 'Create Invoice',
      errorMessage: response.errorMsg,
      invoiceId: null,
      invoice: response.obj,
      clientList,
      productList
    });
  }
};

exports.Edit = async function (req, res) {
  const clientList = await _clientOps.getAllClients();
  const productList = await _productOps.getAllProducts();
  const invoiceId = req.params.id;
  const invoice = await _invoiceOps.getInvoiceById(invoiceId);
  res.render('invoice-form', {
    title: 'Create Invoice',
    errorMessage: '',
    invoiceId,
    invoice,
    clientList,
    productList
  });
};

exports.EditInvoice = async function (req, res) {
  const invoiceId = req.body.invoiceId;
  const invoiceClient = await _clientOps.getClientById(req.body.clientId);

  const productIds = req.body['productId[]'];
  const quantities = req.body['quantity[]'];

  const products = await _invoiceOps.constructInvoiceProducts(productIds);

  let formObj = {
    invoiceId,
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    dueDate: req.body.dueDate,
    invoiceClient,
    products,
    quantities
  };

  //try to update an invoice object and add to database
  response = await _invoiceOps.updateInvoiceById(invoiceId, formObj);

  // if no errors, it was udpated and save to db successfully
  if (response.errorMsg == '') {
    const invoices = await _invoiceOps.getAllInvoices();
    res.render('invoice-index', {
      title: 'Invoices',
      invoices,
      filterText: '',
      errorMessage: ''
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    const clientList = await _clientOps.getAllClients();
    const productList = await _productOps.getAllProducts();

    res.render('invoice-form', {
      title: 'Edit Invoice',
      errorMessage: response.errorMsg,
      invoiceId,
      invoice: response.obj,
      clientList,
      productList
    });
  }
};

exports.DeleteInvoiceById = async function (req, res) {
  const invoiceId = req.params.id;
  let deletedInvoice = await _invoiceOps.deleteInvoiceById(invoiceId);
  let invoices = await _invoiceOps.getAllInvoices();

  if (deletedInvoice) {
    res.render('invoice-index', {
      title: 'Invoices',
      invoices,
      filterText: '',
      errorMessage: ''
    });
  } else {
    res.render('invoice-index', {
      title: 'Invoices',
      invoices,
      filterText: '',
      errorMessage: 'Error.  Unable to Delete'
    });
  }
};
