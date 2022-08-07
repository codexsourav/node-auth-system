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
  const userdata = await users.findOne({ token }, { pass: 0 });
  if (userdata.token !== token) {
    res.status(200).json({
      auth: false,
    });
  }

  try {
    const decode = jwt.verify(token, process.env.KEY);
    if (decode) {
      console.log("all is ok");
    } else {
      console.log("error");
    }
    console.log(decode);
  } catch (error) {
    res.status(200).json({
      auth: false,
    });
    return false;
  }

  next();
};

module.exports = authsts;
