const Project = require("../models/Project");

exports.getAll = async (req, res, next) => {
  try {
    const { category, search, featured } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = { $regex: category, $options: "i" };
    if (featured === "true") filter.featured = true;
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tech: { $elemMatch: { $regex: search, $options: "i" } } },
    ];
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).select("-__v");
    res.json(projects);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const p = await Project.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) { next(err); }
};
