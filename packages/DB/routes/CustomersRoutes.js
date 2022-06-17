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
    const allCustomers = await Customers.find();
    if (customer) {
      res.send({ status: false, message: "this login already exists" });
    } else {
      const customer = new Customers(req.body);
      customer.password = bcrypt.hashSync(req.body.password, 10);
      customer.token = jwt.sign({ _id: customer._id }, tokenKey);
      if (allCustomers.length === 0) customer.isAdmin = true;
      await customer.save();
      res.send({ status: true, message: "new customer is registered" });
    }
  } catch (error) {
    console.log({ message: error });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find();
    customers
      .sort((a, b) => a.login > b.login)
      .sort((a, b) => +a.isAdmin - +b.isAdmin)
      .reverse();
    res.send(customers);
  } catch (error) {
    console.log({ message: error });
  }
});

module.exports = router;
