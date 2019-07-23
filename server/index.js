const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");
require("dotenv").config();

console.log(process.env.NODE_ENV);
// CONNECT TO DATABASE
if (process.env.NODE_ENV === "test") {
  mongoose.connect(config.testDatabase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
} else {
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}

let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

db.on("error", err => {
  console.log(err);
});

// EXPRESS APP
const app = express();

// BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("connect-history-api-fallback")());

// CORS FOR CROSS ORIGIN
app.use(cors());

require("./config/passport");

// IMPORT ROUTES
const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");
const decks = require("./routes/decks");
const admin = require("./routes/admin");

// ROUTING
app.use("/register", register);
app.use("/login", login);
app.use("/cards", cards);
app.use("/decks", decks);
app.use("/admin", admin);

// process.env.NODE_ENV = "production";
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/build/index.html"));
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = { app: app, db: db };
