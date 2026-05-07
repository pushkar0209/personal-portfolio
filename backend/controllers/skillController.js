const Skill = require("../models/Skill");

exports.getAll = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 }).select("-__v");
    res.json(skills);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const s = await Skill.create(req.body);
    res.status(201).json(s);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const s = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ message: "Not found" });
    res.json(s);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};
