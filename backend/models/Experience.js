const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company:      { type: String, required: true },
  role:         { type: String, required: true },
  period:       { type: String, required: true },
  location:     String,
  description:  { type: String, required: true },
  achievements: [String],
  tech:         [String],
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
