const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { collection: "clients" }
);

const Client = mongoose.model("Client", clientSchema);

//Insert initial data into collection
Client.insertMany([
  { firstName: "Alex", lastName: "Fang" },
  { firstName: "Ayesha", lastName: "Ayesha" },
  { firstName: "Eunice", lastName: "Eunice" },
  { firstName: "Samenah", lastName: "Samenah" },
]);

module.exports = Client;
