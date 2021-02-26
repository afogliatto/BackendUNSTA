const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//Import routes
const carsRoute = require("./routes/cars");

app.use("/cars", carsRoute);

//Routes

app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connecto to DB

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!"),
);

//Port listener
app.listen(3000);
