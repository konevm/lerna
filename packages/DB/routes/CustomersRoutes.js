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
      const customers = await Customers.find().sort({ login: 1, isAdmin: 1 });

      res.send({ status: true, customers: customers });
    }
  } catch (error) {
    console.log({ message: error });
  }
});

const auth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token) {
    const id = jwt.verify(token, tokenKey);
    const user = await Customers.findOne({ _id: id._id });
    if (user.isAdmin) {
      next();
    } else res.send("Not admin");
  }
};

router
  .route("/customers")
  .get(async (req, res) => {
    try {
      const customers = await Customers.find().sort({ login: 1, isAdmin: 1 });
      res.send(customers);
    } catch (error) {
      console.log({ message: error });
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.body;
      const customer = await Customers.findOneAndReplace({ id: user.id }, user);
      await customer.save();
      const customers = await Customers.find().sort({ login: 1, isAdmin: 1 });
      res.send({ customers: customers });
    } catch (error) {
      console.log({ message: error });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.query.id;
      await Customers.findOneAndDelete({ id: id });

      const customers = await Customers.find().sort({ login: 1, isAdmin: 1 });
      res.send(customers);
    } catch (error) {
      console.log({ message: error });
    }
  });

module.exports = router;
