const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");
require('dotenv').config();

// CONNECT TO DATABASE
mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

let db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
});

db.on("error", (err) => {
    console.log(err);
});

// EXPRESS APP
const app = express();

// BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS FOR CROSS ORIGIN
app.use(cors());

// IMPORT ROUTES
const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");

// ROUTING
app.use("/register", register);
app.use("/login", login);
app.use("/cards", cards);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});