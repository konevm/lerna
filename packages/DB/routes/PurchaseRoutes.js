const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Purchase = require("../models/Purchase");
const Customers = require("../models/Customers");

const tokenKey = "myNewJWTTokenKey";

const auth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token) {
    const id = jwt.verify(token, tokenKey);
    const user = await Customers.findOne({ _id: id._id });
    if (user.isAdmin || user.id === req.body.customerId || user.id === req.query.id) {
      next();
    } else res.send("Not admin");
  }
};
router
  .route("/purchases")
  .get(auth, async (req, res) => {
    try {
      const id = req.query.id;
      const customer = await Customers.findOne({ id: id });
      if (customer.isAdmin) {
        const purchases = await Purchase.find().sort({ totalPrice: -1 });
        res.send(purchases);
      } else {
        const purchases = await Purchase.find({ customerId: id }).sort({ totalPrice: -1 });
        res.send(purchases);
      }
    } catch (error) {
      console.log({ message: error });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const purchase = new Purchase(req.body);
      await purchase.save();
      const purchases = await Purchase.find({ customerId: req.body.customerId });
      setTimeout(() => {
        res.send(purchases);
      }, 3000);
    } catch (error) {
      console.log({ message: error });
    }
  });

module.exports = router;
