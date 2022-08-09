const users = require("../model/authSchema");
const jwt = require("jsonwebtoken");

const authsts = async (req, res, next) => {
  // Get Token And Chack Is Are valid OR Not
  const token = req.cookies.user;
  if (!token) {
    res.status(401).json({
      auth: false,
    });
    return false;
  }

  // chack token with key

  try {
    var decode = jwt.verify(token, process.env.KEY);
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

  // chack Token Exist on Database

  try {
    var userdata = await users.findOne({ token }, { pass: 0 });
    if (userdata.token !== token) {
      res.status(200).json({
        auth: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "server Data error",
      sts: false,
      fld: null,
    });
    console.log(error);
    return false;
  }

  // chack session id Is same ON User Database ID

  if (userdata._id.toString() != decode.user) {
    res.status(200).json({
      auth: false,
    });
    return false;
  }

  // send user data On Response

  res.userinfo = userdata;
  next();
};

module.exports = authsts;
