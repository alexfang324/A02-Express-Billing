const Client = require("../models/Client.js");

class ClientOps {
  ClientOps() {}

  async getAllClients() {
    const clients = await Client.find({});
    return clients;
  }

  async updateClientById(id, fName, lName) {
    console.log(`updating profile by id ${id}`);
    const clientObj = await Client.findById(id);
    
    clientObj.firstName = fName;
    clientObj.lastName = lName;
    // client.email = email;

    // let result = await client.save();
    // console.log("updated client: ", result);
    // return {
    //   obj: result,
    //   errorMsg: "",
    // };

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

  async deleteClientById(id) {
    console.log(`deleting client by id ${id}`);
    let result = await Client.findByIdAndDelete(id);
    console.log(result);
    return result;
  }

  async getClientById(id) {
    console.log(`getting client by id ${id}`);
    let client = await Client.findById(id);
    return client;
  }



}

module.exports = ClientOps;
