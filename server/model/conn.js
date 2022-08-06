const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB).then(() => {
  console.log(" Database Is Connected");
});
