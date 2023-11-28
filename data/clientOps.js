const Client = require("../models/Client.js");

class ClientOps {
  ClientOps() {}

  async getAllClients() {
    const clients = await Client.find({});
    return clients;
  }
}

module.exports = ClientOps;
