const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((e) => console.log("db connected"))
    .catch((e) => console.log(e));
}

module.exports = connectDB;
