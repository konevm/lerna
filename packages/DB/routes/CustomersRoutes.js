const express = require("express");
const router = express.Router();
const Customers = require("../models/Customers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenKey = "myNewJWTTokenKey";

router.get("/", (req, res) => res.send("connected"));

router.get("/authorization", async (req, res) => {
  try {
    const customer = await Customers.findOne({
      login: req.query.login,
    });
    if (customer) {
      const verify = bcrypt.compareSync(req.query.password, customer.password);
      if (verify) {
        const token = (customer.token = jwt.sign({ _id: customer._id }, tokenKey));
        res.send({ user: customer, token });
      } else res.send("this password is invalid");
    } else res.send("this user doesn't exsist");
  } catch (error) {
    res.send({ message: error });
  }
});

router.post("/registration", async (req, res) => {
  try {
    const customer = await Customers.findOne({
      login: req.body.login,
    });
    if (customer) {
      res.send({ status: false, message: "this login already exists" });
    } else {
      const customer = new Customers(req.body);
      customer.password = bcrypt.hashSync(req.body.password, 10);
      customer.token = jwt.sign({ _id: customer._id }, tokenKey);
      await customer.save();
      res.send({ status: true, message: "new customer is registered" });
    }
  } catch (error) {
    console.log({ message: error });
  }
});

module.exports = router;
