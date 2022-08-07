const users = require("../model/authSchema");
const jwt = require("jsonwebtoken");

const authsts = async (req, res, next) => {
  const token = req.cookies.user;
  if (!token) {
    res.status(401).json({
      auth: false,
    });
    return false;
  }

  try {
    var userdata = await users.findOne({ token }, { pass: 0 });
    if (userdata.token !== token) {
      res.status(200).json({
        auth: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "save Data error",
      sts: false,
      fld: null,
    });
    console.log(error);
    return false;
  }

  try {
    const decode = jwt.verify(token, process.env.KEY);
    if (!decode) {
      res.status(200).json({
        auth: false,
      });
      return false;
    }
  } catch (error) {
    res.status(200).json({
      auth: false,
    });
    return false;
  }

  res.userinfo = userdata;
  next();
};

module.exports = authsts;
