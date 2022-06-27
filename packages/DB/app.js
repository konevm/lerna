const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomersRoute = require("./routes/CustomersRoutes");
const PurchaseRoute = require("./routes/PurchaseRoutes");

const app = express();
const port = 3001;
const url = "mongodb://localhost:27017/shop";

app.use(cors());
app.use(express.json());

app.use("/", CustomersRoute);
app.use("/", PurchaseRoute);

app.listen(port);

mongoose.connect(url, () => console.log("connected"));
