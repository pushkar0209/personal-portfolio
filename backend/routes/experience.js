const router = require("express").Router();
const c = require("../controllers/experienceController");
router.get("/", c.getAll);
module.exports = router;
