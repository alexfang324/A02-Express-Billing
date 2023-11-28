const ClientOps = require("../data/ClientOps");

const _clientOps = new ClientOps();

exports.Index = async function (req, res) {
  let clients = await _clientOps.getAllClients();
  res.render("client-index", {
    title: "Clients",
    clients,
  });
};

// Handle profile form GET request
exports.Create = async function (request, response) {
  response.render("client-form", {
    title: "Create Client",
    errorMessage: "",
    // clientId: null,
    clientA: {},
  });
};

// Handle profile form Post request
exports.CreateClient = async function (request, response) {
  console.log("in create")

  // instantiate a new Profile Object populated with form data
  let tempClientObj = new Client({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,

  });
console.log("in create")
  //
  let responseObj = await _clientOps.createClient(tempClientObj);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clients = await _clientOps.getAllClients();
    console.log(responseObj.obj);
    response.render("client-index", {
      // title: "Express Yourself - " + responseObj.obj.name,
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
    });
  }
};
