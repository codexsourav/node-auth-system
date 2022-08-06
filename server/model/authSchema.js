require("./conn");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 40,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    unique: true,
  },
  uname: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  date: {
    default: Date.now,
    type: Date,
  },
});

users.pre("save", function (next) {
  if (!this.isModified("pass")) {
    var hash = bcrypt.hashSync(pass, 10);
    this.pass = hash;
    next();
  }

  this.pass = bcrypt.hashSync(this.pass, 10);
  next();
});
const Usersmdl = mongoose.model("users", users);

module.exports = Usersmdl;
