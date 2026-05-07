const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  tagline:         String,
  description:     { type: String, required: true },
  longDescription: String,
  tech:            [String],
  link:            String,
  github:          String,
  featured:        { type: Boolean, default: false },
  gradient:        { type: String, default: "from-primary/20 via-accent/10 to-transparent" },
  accentColor:     { type: String, default: "#6366f1" },
  metrics:         [String],
  category:        String,
  codeSnippet:     String,
  order:           { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
