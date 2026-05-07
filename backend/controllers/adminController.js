const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(admin._id);
    res.json({ token, username: admin.username });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res) => {
  res.json({ id: req.admin.id, message: "Authenticated" });
};
