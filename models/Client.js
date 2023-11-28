const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { collection: "clients" }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
