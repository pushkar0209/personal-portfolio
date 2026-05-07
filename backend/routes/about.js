const router = require("express").Router();
const { getAbout } = require("../controllers/aboutController");
router.get("/", getAbout);
module.exports = router;
