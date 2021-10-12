const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const getUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json({ msg: "Access Denied" });
  }
  try {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!userToken) {
      return res.status(400).json({ msg: "Access denied" });
    }

    const userData = await User.findById(userToken.id).select("-password");
    req.user = userData;
    next();
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = getUser;
