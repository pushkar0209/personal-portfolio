const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  name:    { type: String, required: true, maxlength: 100 },
  email:   { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { type: String, maxlength: 200 },
  message: { type: String, required: true, maxlength: 2000 },
  read:    { type: Boolean, default: false },
  ip:      String,
}, { timestamps: true });

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
