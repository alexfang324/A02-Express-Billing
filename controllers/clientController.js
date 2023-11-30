const ClientOps = require("../data/ClientOps");
const Client =require("../models/Client")

const _clientOps = new ClientOps();

exports.Index = async function (req, res) {
  let clients = await _clientOps.getAllClients();
  res.render("client-index", {
    title: "Clients",
    clients,
  });
};

exports.Edit = async function (request, response) {
  const clientId = request.params.id;
  console.log(clientId,"hi");
  let clientObj = await _clientOps.getClientById(clientId);
  response.render("client-form", {
    title: "Edit Client",
    errorMessage: "",
    client_id: clientId,
    clientA: clientObj,
  });
};

exports.EditClient = async function (request, response) {
  const clientId = request.body.client_id;
  const fName = request.body.firstName;
  const lName = request.body.lastName;
  // const email = request.body.email;


  // send these to profileOps to update and save the document
  let responseObj = await _clientOps.updateClientById(clientId, fName,lName);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clients = await _clientOps.getAllClients();
    response.render("client-index", {
      title: "Clients",
      clients: clients,
      
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log(clientId)
    console.log("An error occured. Item not edited.");
    response.render("client-form", {
      title: "Edit Client",
      clientA: responseObj.obj,
      client_id: clientId,
      errorMessage: responseObj.errorMsg,
    });
  }
};

// Handle profile form GET request
exports.Create = async function (request, response) {
  response.render("client-form", {
    title: "Create Client",
    errorMessage: "",
    client_id:'',
    clientA: {},
  });
};

// Handle profile form Post request
exports.CreateClient = async function (request, response) {


  // instantiate a new Profile Object populated with form data
  let tempClientObj = new Client({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    // email: request.body.email,

  });

  //
  let responseObj = await _clientOps.createClient(tempClientObj);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clients = await _clientOps.getAllClients();
    console.log(responseObj.obj);
    response.render("client-index", {
      title: "Clients",
      // profiles: profiles,
      // profileId: responseObj.obj._id.valueOf(),
      // layout: "./layouts/sidebar",
      clients : clients
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occured. Client not created.");
    response.render("client-form", {
      title: "Create Profile",
      clientA: responseObj.obj,
      errorMessage: responseObj.errorMsg,
      client_id: '',
    });
  }
};

exports.DeleteClientById = async function (request, response) {
  const clientId = request.params.id;
  console.log(`deleting single profile by id ${clientId}`);
  let deletedClient = await _clientOps.deleteClientById(clientId);
  let clients = await _clientOps.getAllClients();

  if (deletedClient) {
    response.render("client-index", {
      title: "Clients",
      clients: clients,
    });
  } else {
    response.render("client-index", {
      title: "Clients",
      clients: clients,
      errorMessage: "Error.  Unable to Delete",
    });
  }
};

exports.Detail = async function (request, response) {
  const clientId = request.params.id;
  console.log(`loading single profile by id ${clientId}`);
  let client = await _clientOps.getClientById(clientId);
  let clients = await _clientOps.getAllClients();
  if (client) {
    response.render("client-detail", {
      title: "Clients - " + client.firstName,
      clientA : client,
      clientId: request.params.id,
      
    });
  } else {
    response.render("client-index", {
      title: "Clients",
      clients: [],
    });
  }
};

// exports.Edit = async function (request, response) {
//   const clientId = request.params.id;
//   let clientObj = await _clientOps.getClientById(clientId);
//   response.render("client-form", {
//     title: "Edit Client",
//     errorMessage: "",
//     client_id: clientId,
//     clientA: clientObj,
//   });
// };
