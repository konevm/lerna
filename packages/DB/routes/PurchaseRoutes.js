const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const jwt = require("jsonwebtoken");

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
