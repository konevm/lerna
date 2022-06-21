const mongoose = require("mongoose");

const ProductShema = mongoose.Schema({
  product: String,
  amount: Number,
  price: Number,
});

const PurchaseSchema = mongoose.Schema({
  id: { type: String, require: true },
  customerId: { type: String, require: true },
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  phone: { type: String, require: true },
  totalPrice: Number,
  products: [ProductShema],
});

module.exports = mongoose.model("Purchases", PurchaseSchema);
