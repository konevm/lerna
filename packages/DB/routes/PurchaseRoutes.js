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
    const purchases = await Purchase.find();
    purchases.sort((a, b) => a.totalPrice - b.totalPrice).reverse();
    res.send(purchases);
  } catch (error) {
    console.log({ message: error });
  }
});
