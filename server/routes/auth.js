const express = require("express");
const auth = require("../controller/authController");
const authsts = require("../model/authsts");
const path = express.Router();

path.get("/", auth.signin);
path.post("/signup", auth.signup);
path.get("/user", authsts, (req, res) => {
  console.log(res.userinfo);
});

module.exports = path;
