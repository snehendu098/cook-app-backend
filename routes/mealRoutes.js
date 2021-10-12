const router = require("express").Router();
const mealsCtrl = require("../controllers/mealsCtrl");

router.post("/", mealsCtrl.create);
router.get("/", mealsCtrl.read);

module.exports = router;
