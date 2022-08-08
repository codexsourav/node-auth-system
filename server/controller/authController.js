const users = require("../model/authSchema");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    const { name, email, uname, dob, pass } = req.body;

    // chack fileds are not empty \
    if (!name || !email || !uname || !dob || !pass) {
      res
        .status(406)
        .json({ message: "Please Fill All Data", sts: false, fld: "all" });
      return false;
    }

    // chack name leanth
    if (!validator.isLength(name, { min: 2, max: 40 })) {
      res
        .status(406)
        .json({ message: "Name 2 To 40", sts: false, fld: "name" });
      return false;
    }

    // chack email aleady exist or not
    try {
      const chackemail = await users.find({ email });
      if (chackemail.length) {
        res.status(500).json({
          message: "This Email Is Alrady Exist",
          sts: false,
          fld: "email",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server Data Error",
        sts: false,
        fld: null,
      });
      return false;
    }

    // chack valid email or not
    if (!validator.isEmail(email)) {
      res
        .status(406)
        .json({ message: "Enter A Valid Email", sts: false, fld: "email" });
      return false;
    }

    // chack username langth
    if (!validator.isLength(uname, { min: 3 })) {
      res
        .status(406)
        .json({ message: "username min 3 latters", sts: false, fld: "uname" });
      return false;
    }

    // chack dugnicate username
    try {
      const chackuname = await users.find({ uname });
      if (chackuname.length) {
        res.status(406).json({
          message: "This Username Is Alrady Exist",
          sts: false,
          fld: "uname",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server Data Error",
        sts: false,
        fld: null,
      });
      return false;
    }

    // chack username type
    if (!validator.isAlphanumeric(uname)) {
      res
        .status(406)
        .json({ message: "Enter A Valid Username", sts: false, fld: "uname" });
      return false;
    }

    // validate DOB
    if (!validator.isDate(dob)) {
      res
        .status(406)
        .json({ message: "Enter A Valid Date ", sts: false, fld: "dob" });
      return false;
    }

    // password leangtn validate
    if (!validator.isLength(pass, { min: 6 })) {
      res.status(406).json({
        message: "Password Is Too Short Min 2",
        sts: false,
        fld: "pass",
      });
      return false;
    }

    // Add Data To DataBase
    try {
      const saveData = new users(req.body);
      const save = await saveData.save();

      if (save) {
        res
          .status(201)
          .json({ message: "Your Account is Created", sts: true, fld: null });
        return false;
      }
    } catch (error) {
      res.status(500).json({
        message: "save Data error",
        sts: false,
        fld: null,
      });
      console.log(error);
      return false;
    }
  },

  /////// Login User //////////////////////////////////////////###########################

  signin: async (req, res) => {
    const { uname, pass } = req.body;
    // chack Input username Or Password
    if (!uname || !pass) {
      res.status(406).json({
        message: "Please Enter UserName or Password",
        sts: false,
        fld: "all",
      });
      return false;
    }

    try {
      var userdata = await users.findOne({ uname }, { uname: 1, pass: 1 });
      if (!userdata) {
        res.status(401).json({
          message: "Invalid UserName or Password",
          sts: false,
          fld: "invalid data Fill",
        });
        return false;
      }
    } catch (error) {
      res.status(500).json({
        message: "save Data error",
        sts: false,
        fld: null,
      });
      console.log(error);
      return false;
    }

    // chack password
    if (!bcrypt.compareSync(pass, userdata.pass)) {
      res.status(401).json({
        message: "Invalid UserName or Password",
        sts: false,
        fld: "invalid data Fill",
      });
      return false;
    }
    var token = jwt.sign({ user: userdata._id }, process.env.KEY);
    res.cookie("user", token, {
      expires: new Date(Date.now() + 90 * 24 * 3600000),
      // cookie for 90 days
    });

    try {
      await users.updateOne({ _id: userdata._id }, { token });
    } catch (error) {
      res.status(500).json({
        message: "save Data error",
        sts: false,
        fld: null,
      });
      console.log(error);
      return false;
    }

    res.status(200).json({
      message: "Login SucessFull",
      sts: true,
      fld: null,
    });
  },
};
