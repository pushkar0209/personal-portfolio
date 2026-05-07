const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree:      { type: String, required: true },
  duration:    { type: String, required: true },
  type:        String,
  color:       { type: String, default: "#6366f1" },
  highlights:  [String],
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Education", EducationSchema);
