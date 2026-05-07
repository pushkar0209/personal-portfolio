const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../controllers/adminController");
const aboutCtrl = require("../controllers/aboutController");
const expCtrl   = require("../controllers/experienceController");
const projCtrl  = require("../controllers/projectController");
const skillCtrl = require("../controllers/skillController");
const eduCtrl   = require("../controllers/educationController");

// ── auth ──────────────────────────────────────────────────────────────────────
router.post("/login", admin.login);
router.get("/me",     auth, admin.getMe);

// ── about ─────────────────────────────────────────────────────────────────────
router.put("/about", auth, aboutCtrl.upsertAbout);

// ── projects ──────────────────────────────────────────────────────────────────
router.post("/projects",        auth, projCtrl.create);
router.put("/projects/:id",     auth, projCtrl.update);
router.delete("/projects/:id",  auth, projCtrl.remove);

// ── skills ────────────────────────────────────────────────────────────────────
router.post("/skills",        auth, skillCtrl.create);
router.put("/skills/:id",     auth, skillCtrl.update);
router.delete("/skills/:id",  auth, skillCtrl.remove);

// ── experience ────────────────────────────────────────────────────────────────
router.post("/experience",        auth, expCtrl.create);
router.put("/experience/:id",     auth, expCtrl.update);
router.delete("/experience/:id",  auth, expCtrl.remove);

// ── education ─────────────────────────────────────────────────────────────────
router.post("/education",        auth, eduCtrl.create);
router.put("/education/:id",     auth, eduCtrl.update);
router.delete("/education/:id",  auth, eduCtrl.remove);

module.exports = router;
