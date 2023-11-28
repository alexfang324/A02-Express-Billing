const Client = require("../models/Client.js");

class ClientOps {
  ClientOps() {}

  async getAllClients() {
    const clients = await Client.find({});
    return clients;
  }


  async createClient(clientObj) {
    try {
      const error = await clientObj.validateSync();
      if (error) {
        const response = {
          obj: clientObj,
          errorMsg: error.message,
        };
        return response; // Exit if the model is invalid
      }

      // Model is valid, so save it
      const result = await clientObj.save();
      const response = {
        obj: result,
        errorMsg: "",
      };
      return response;
    } catch (error) {
      const response = {
        obj: clientObj,
        errorMsg: error.message,
      };
      return response;
    }
  }



}

module.exports = ClientOps;
