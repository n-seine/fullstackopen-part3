require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;
