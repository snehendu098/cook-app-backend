import mongoose from "mongoose";
const { Schema } = mongoose;

const Meals = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId(),
    },
    nonVeg: {
      type: Boolean,
      required: true,
    },
    meatIncluded: {
      type: Boolean,
      required: true,
    },
    materials: {
      type: Array,
      default: [],
    },
    steps: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("meals", Meals);
