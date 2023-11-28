const ClientOps = require("../data/ClientOps");

const _clientOps = new ClientOps();

exports.Index = async function (req, res) {
  let clients = await _clientOps.getAllClients();
  res.render("client-index", {
    title: "Clients",
    clients,
  });
};
