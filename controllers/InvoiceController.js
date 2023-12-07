const Invoice = require('../models/Invoice');
const InvoiceOps = require('../data/InvoiceOps');
const ClientOps = require('../data/ClientOps');
const ProductOps = require('../data/ProductOps');
const { response } = require('express');

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

  res.render('invoice-detail', {
    title: `Invoice - ${invoice.invoiceNumber}`,
    invoice
  });
};

exports.Create = async function (req, res) {
  const allClients = await _clientOps.getAllClients();
  const allProducts = await _productOps.getAllProducts();
  res.render('invoice-form', {
    title: 'Create Invoice',
    errorMessage: '',
    invoiceId: null,
    invoice: {},
    clients: allClients,
    products: allProducts
  });
};

exports.CreateInvoice = async function (req, res) {
  const invoiceClient = await _clientOps.getClientById(req.body.clientId);
  const product = await _productOps.getProductById(req.body.productId);
  const productQuantity = req.body.productQuantity;
  let products = [];
  for (let i = 0; i < productQuantity; i++) {
    products.push({ ...product });
  }
  console.log('dueDate: ', req.body.dueDate);
  let formObj = new Invoice({
    invoiceId: null,
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    dueDate: req.body.dueDate,
    invoiceClient,
    products
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
    console.log('response dueDate: ', response.obj.dueDate);
    const allClients = await _clientOps.getAllClients();
    const allProducts = await _productOps.getAllProducts();

    res.render('invoice-form', {
      title: 'Create Invoice',
      errorMessage: response.errorMsg,
      invoiceId: null,
      invoice: response.obj,
      clients: allClients,
      products: allProducts
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
      products,
      filterText: '',
      errorMessage: 'Error.  Unable to Delete'
    });
  }
};
