const dotenv = require("dotenv");
const express = require("express");
const auth = require("./routes/auth");
dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(auth);
// Start Server
app.listen(port, () => {
  console.log(" Server Start On Port No => " + port);
});
