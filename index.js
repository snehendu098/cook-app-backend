require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

// config
app.use(express.json());
app.use(cors());

// routes
const authRoutes = require("./routes/authRoutes");
const cateRoutes = require("./routes/cateRoutes");
const mealRoutes = require("./routes/mealRoutes");

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/category", cateRoutes);
app.use("/api/meals", mealRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
