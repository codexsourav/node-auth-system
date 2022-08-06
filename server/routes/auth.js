const express = require("express");
const auth = require("../controller/authController");
const path = express.Router();

path.post("/", auth.signin);

module.exports = path;
