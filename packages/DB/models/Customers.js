const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  id: { type: String, require: true },
  login: { type: String, require: true },
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  address: { type: String, require: true },
  phone: { type: String, require: true },
  token: String,
});

module.exports = mongoose.model("Customers", CustomerSchema);
