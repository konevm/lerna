const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");
const { request } = require("http");
const Route = require("./routes/Routes");

const index = express();
const port = 3001;
const url = "mongodb://localhost:27017/shop";

index.use(cors());
index.use(bodyParser.json());
index.use("/", Route);

index.listen(port);

mongoose.connect(url, () => console.log("connected"));
