const Meals = require("../models/Meals");

const mealsCtrl = {
  create: async (req, res) => {
    const {
      name,
      description,
      category,
      nonVeg,
      meatIncluded,
      materials,
      steps,
    } = req.body;
    try {
      const check = await Meals.findOne({ name });

      if (check) {
        return res.status(400).json({ msg: "One has already been created" });
      }

      const uploadMeals = new Meals({
        name,
        description,
        category,
        nonVeg,
        meatIncluded,
        materials,
        steps,
      });

      const savedMeals = await uploadMeals.save();

      return res.status(200).json(savedMeals);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  read: async (req, res) => {
    try {
      const meals = await Meals.find();
      return res.status(200).json(meals);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  update: async (req, res) => {},
};

module.exports = mealsCtrl;
