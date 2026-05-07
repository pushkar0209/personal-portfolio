const About = require("../models/About");

exports.getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne().select("-__v");
    if (!about) return res.status(404).json({ message: "About data not found" });
    res.json(about);
  } catch (err) { next(err); }
};

exports.upsertAbout = async (req, res, next) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
    res.json(about);
  } catch (err) { next(err); }
};
