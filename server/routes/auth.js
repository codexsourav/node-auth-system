const express = require("express");
const auth = require("../controller/authController");
const path = express.Router();

path.get("/", auth.signin);
path.post("/signup", auth.signup);

module.exports = path;
