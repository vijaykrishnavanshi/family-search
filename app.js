const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const route = require('./route');

// Express App
const app = express();

// Use default logger for now
app.use(logger("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(route);

// This is to check if the service is online or not
app.use("/ping", function(req, res) {
  res.json({ reply: "pong" });
  res.end();
});

// Export the express app instance
module.exports = app;
