const Category = require("../models/Categories");

const cateCtrl = {
  create: async (req, res) => {
    if (req.user.role === 0) {
      return res.status(400).json({ msg: "Access denied" });
    }

    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ msg: "Enter a name" });
      }

      const check = await Category.findOne({ name });

      if (check) {
        return res.status(400).json({ msg: "One has already been created" });
      }

      const newCate = new Category({ name });

      const createdCate = await newCate.save();

      return res.status(200).json(createdCate);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  read: async (req, res) => {
    try {
      const cate = await Category.find();
      return res.status(200).json(cate);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  update: async (req, res) => {
    if (req.user.role === 0) {
      return res.status(400).json({ msg: "Access denied" });
    }
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ msg: "An id is needed" });
      }

      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ msg: "One field cannot be empty" });
      }

      await Category.findByIdAndUpdate(id, { name });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },

  delete: async (req, res) => {
    if (req.user.role === 0) {
      return res.status(400).json({ msg: "Access denied" });
    }
    try {
      const id = req.params.id;
      let cate = await Category.findById(id);

      if (!cate) {
        return res.status(400).json({ msg: "No category was found" });
      }

      cate = await Category.findByIdAndDelete(id);
      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },
};

module.exports = cateCtrl;
