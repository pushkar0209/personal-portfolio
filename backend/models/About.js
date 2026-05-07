const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  title:        { type: String, required: true },
  tagline:      String,
  bio:          { type: String, required: true },
  longBio:      String,
  email:        { type: String, required: true },
  phone:        String,
  location:     String,
  availability: String,
  github:       String,
  linkedin:     String,
  twitter:      String,
  portfolio:    String,
  resume:       String,
  stats: [{ label: String, value: String, suffix: String }],
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);
