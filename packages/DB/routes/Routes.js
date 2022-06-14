const express = require("express");
const router = express.Router();
const Customers = require("../models/Customers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenKey = "myNewJWTTokenKey";

// Validate user
router.get("/authorization", async (req, res) => {
  try {
    const customer = await Customers.findOne({
      login: req.query.login,
    });
    const verify = bcrypt.compareSync(req.query.password, customer.password);
    console.log(customer);
    if (verify) {
      const token = (customer.token = jwt.sign({ _id: customer._id }, tokenKey));

      res.send({ user: customer, token });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

router.post("/registration", async (req, res) => {
  try {
    console.log(req.body);
    const customer = new Customers(req.body);

    customer.password = bcrypt.hashSync(req.body.password, 10);
    customer.token = jwt.sign({ _id: customer._id }, tokenKey);
    console.log(customer);
    await customer.save();
    res.send(customer);
  } catch (error) {
    console.log({ message: error });
  }
});

module.exports = router;
