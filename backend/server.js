require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const app = express();

// ── connect database (non-fatal — server starts regardless) ──────────────────
connectDB().catch((e) => console.warn("⚠️  DB unavailable, running without database:", e.message));

// ── security middleware ───────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: "Too many contact requests" });

// ── body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── routes ────────────────────────────────────────────────────────────────────
app.use("/api/about",      require("./routes/about"));
app.use("/api/education",  require("./routes/education"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/projects",   require("./routes/projects"));
app.use("/api/skills",     require("./routes/skills"));
app.use("/api/contact",    contactLimiter, require("./routes/contact"));
app.use("/api/admin",      require("./routes/admin"));

// ── health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok", time: new Date() }));

// ── global error handler ──────────────────────────────────────────────────────
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
