const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");

const port = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(auth);

// Start Server
app.listen(port, () => {
  console.log(" Server Start On Port No => " + port);
});
