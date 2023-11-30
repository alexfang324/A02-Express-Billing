const Client = require("../models/Client.js");

class ClientOps {
  ClientOps() {}

  async getAllClients() {
    const clients = await Client.find({});
    return clients;
  }

  async updateClientById(id, fName, lName,email) {
    console.log(`updating profile by id ${id}`);
    const clientObj = await Client.findById(id);
    
    clientObj.firstName = fName;
    clientObj.lastName = lName;
    clientObj.email = email;
    try {
      const error = await clientObj.validateSync();
      console.log("eeee",error)
      if (error) {
        const response = {
          obj: clientObj,
          errorMsg: error.message,
        };
        return response; 
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
      console.log('clientobj', clientObj);
      const error = await clientObj.validateSync();
      console.log(error,"ceate errrr")
      console.log()
      if (error!="") {
        const response = {
          obj: clientObj,
          errorMsg: error.message,
        };
        return response; // Exit if the model is invalid
      }
      console.log('Went here')
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
