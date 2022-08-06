const users = require("../model/authSchema");
const validator = require("validator");

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
    const chackemail = await users.find({ email });
    if (chackemail.length) {
      res.status(406).json({
        message: "This Email Is Alrady Exist",
        sts: false,
        fld: "email",
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
        .json({ message: "username min 2 latters", sts: false, fld: "uname" });
      return false;
    }

    // chack dugnicate username
    const chackuname = await users.find({ uname });
    if (chackuname.length) {
      res.status(406).json({
        message: "This Username Is Alrady Exist",
        sts: false,
        fld: "uname",
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

    const saveData = new users(req.body);
    const save = await saveData.save();
    if (save) {
      res
        .status(201)
        .json({ message: "Your Account is Created", sts: true, fld: null });
      return false;
    }
  },
  signin: async (req, res) => {
    res.send("hello");
    console.log(await users.find());
  },
};
