require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
