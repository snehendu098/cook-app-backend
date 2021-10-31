const userCtrl = require("../controllers/userCtrl");
const { body } = require("express-validator");
const getUser = require("../middleware/getuser");
const router = require("express").Router();

router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  userCtrl.signUp
);

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  userCtrl.login
);

router.get("/verify", getUser, userCtrl.getUser);

module.exports = router;
