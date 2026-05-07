const router = require("express").Router();
const c = require("../controllers/contactController");
const auth = require("../middleware/auth");
router.post("/",            c.submit);
router.get("/messages",     auth, c.getMessages);
router.patch("/:id/read",   auth, c.markRead);
module.exports = router;
