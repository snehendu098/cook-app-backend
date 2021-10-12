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
      if (req.user.role === 0) {
        return res.status(400).json({ msg: "Access denied" });
      }

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

  update: async (req, res) => {
    if (req.user.role === 0) {
      return res.status(400).json({ msg: "Access denied" });
    }
    try {
      const {
        name,
        description,
        category,
        nonVeg,
        meatIncluded,
        materials,
        steps,
      } = req.body;

      let meal = await Meals.findById(req.params.id);

      if (!meal) {
        return res.status(400).json({ msg: "Not found" });
      }

      const newMeal = {};

      if (
        name ||
        description ||
        category ||
        nonVeg ||
        meatIncluded ||
        materials ||
        steps
      ) {
        newMeal.name = name;
        newMeal.description = description;
        newMeal.category = category;
        newMeal.nonVeg = nonVeg;
        newMeal.meatIncluded = meatIncluded;
        newMeal.materials = materials;
        newMeal.steps = steps;
      }

      meal = await Meals.findByIdAndUpdate(
        req.params.id,
        { $set: newMeal },
        { new: true }
      );

      res.status(200).json(meal);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  delete: async (req, res) => {
    if (req.user.role === 0) {
      return res.status(400).json({ msg: "Access denied" });
    }

    try {
      // find
      const meal = await Meals.findById(req.params.id);

      if (!meal) {
        return res.status(400).json({ msg: "Not found" });
      }

      // delete
      meal = await Meals.findByIdAndDelete(req.params.id);
      return res.status(400).json({ msg: "Success" });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },
};

module.exports = mealsCtrl;
