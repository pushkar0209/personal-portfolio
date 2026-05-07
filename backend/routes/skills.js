const router = require("express").Router();
const c = require("../controllers/skillController");
router.get("/", c.getAll);
module.exports = router;
