import mongoose from "mongoose";
const { Schema } = mongoose;

const cateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", cateSchema);
