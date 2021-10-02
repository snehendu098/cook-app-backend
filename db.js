const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then((e) => console.log("db connected"))
    .catch((e) => console.log("connection failed"));
}

module.exports = connectDB;
