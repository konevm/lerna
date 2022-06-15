const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersRoute = require("./routes/CustomersRoutes");
const PurchaseRoute = require("./routes/PurchaseRoutes");

const index = express();
const port = 3001;
const url = "mongodb://localhost:27017/shop";

index.use(cors());
index.use(express.json());

index.use("/", CustomersRoute);
index.use("/", PurchaseRoute);

index.listen(port);

mongoose.connect(url, () => console.log("connected"));
