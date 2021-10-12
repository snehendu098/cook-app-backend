const router = require("express").Router();
const mealsCtrl = require("../controllers/mealsCtrl");
const getUser = require("../middleware/getuser");

router.post("/", getUser, mealsCtrl.create);
router.get("/", mealsCtrl.read);

module.exports = router;
