const cateCtrl = require("../controllers/cateCtrl");
const check = require("../middleware/getuser");

const router = require("express").Router();

router.post("/create", check, cateCtrl.create);

router.patch("/:id", check, cateCtrl.update);
router.delete("/:id", check, cateCtrl.delete);

// no login
router.get("/", cateCtrl.read);

module.exports = router;
