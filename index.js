const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./routes/authrute");

const port = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(auth);

app.use(express.static("client/build"));
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(" Server Start On Port No => " + port);
});
