const router = require("express").Router();
const c = require("../controllers/educationController");
router.get("/", c.getAll);
module.exports = router;
