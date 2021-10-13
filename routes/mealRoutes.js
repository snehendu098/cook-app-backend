const router = require("express").Router();
const mealsCtrl = require("../controllers/mealsCtrl");
const getUser = require("../middleware/getuser");

// multer config
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.toString().replace(/ /g, ""));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.post("/", getUser, upload.single("image"), mealsCtrl.create);
router.get("/", mealsCtrl.read);
router.patch("/:id", getUser, upload.single("image"), mealsCtrl.update);
router.delete("/:id", getUser, mealsCtrl.delete);

module.exports = router;
