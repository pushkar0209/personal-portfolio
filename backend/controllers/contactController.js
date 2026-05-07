const nodemailer = require("nodemailer");

// In-memory fallback when DB is unavailable
const inMemoryMessages = [];

let ContactMessage;
try {
  ContactMessage = require("../models/ContactMessage");
} catch {
  ContactMessage = null;
}

const mongoose = require("mongoose");

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.submit = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const messageData = {
      name,
      email,
      subject: subject || "(no subject)",
      message,
      ip: req.ip,
      createdAt: new Date(),
    };

    // Try to save to DB; fall back to in-memory
    if (isDbConnected() && ContactMessage) {
      await ContactMessage.create(messageData);
    } else {
      // In-memory storage fallback
      inMemoryMessages.push(messageData);
      console.log("📩 Contact message stored in-memory:", name, email);
    }

    // Send notification email (non-blocking, optional)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter
        .sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `[Portfolio] ${subject || "New message"} — from ${name}`,
          html: `
            <h2>New contact from your portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "(none)"}</p>
            <hr/>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        })
        .catch((e) => console.warn("Mail send failed:", e.message));
    }

    res.status(201).json({
      message: "Message received. I'll get back to you soon!",
    });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    if (isDbConnected() && ContactMessage) {
      const msgs = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(msgs);
    } else {
      res.json(inMemoryMessages.slice().reverse());
    }
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    if (isDbConnected() && ContactMessage) {
      await ContactMessage.findByIdAndUpdate(req.params.id, { read: true });
    }
    res.json({ message: "Marked as read" });
  } catch (err) {
    next(err);
  }
};
