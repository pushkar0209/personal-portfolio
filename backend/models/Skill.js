const mongoose = require("mongoose");

const SkillItemSchema = new mongoose.Schema({ name: String, level: Number }, { _id: false });

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon:     { type: String, default: "wrench" },
  color:    { type: String, default: "cyan" },
  items:    [SkillItemSchema],
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);
