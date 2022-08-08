const express = require("express");
const auth = require("../controller/authController");
const authsts = require("../model/authsts");
const path = express.Router();

path.post("/signin", auth.signin);
path.post("/signup", auth.signup);
path.get("/user", authsts, (req, res) => {
  res.send(res.userinfo);
});

module.exports = path;
