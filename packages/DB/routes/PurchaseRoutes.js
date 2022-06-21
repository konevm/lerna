const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Purchase = require("../models/Purchase");
const Customers = require("../models/Customers");

const tokenKey = "myNewJWTTokenKey";

router.post("/purchase", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    setTimeout(() => {
      res.send(purchase._id);
    }, 3000);
  } catch (error) {
    console.log({ message: error });
  }
});

module.exports = router;
const auth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token) {
    try {
      const user = jwt.verify(token, tokenKey);
      req.user = user;
      next();
    } catch (e) {
      res.send(401);
    }
  } else {
    res.sendStatus(401);
  }
};

router.get("/purchases", async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
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
});
