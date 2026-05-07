"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, MapPin, Send, ArrowUpRight, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { contactApi } from "@/lib/api";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {children}
  </div>
);

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white transition-colors group"
    >
      <span>{email}</span>
      {copied ? (
        <Check size={14} className="text-emerald-400" />
      ) : (
        <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: <GithubIcon />, desc: "See my open source work" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pushkar-sagar-madhuri-003693330", icon: <LinkedinIcon />, desc: "Connect professionally" },
  { label: "Twitter", href: "https://twitter.com", icon: <TwitterIcon />, desc: "Follow my thoughts" },
];

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await contactApi.submit(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setErrorMsg(msg || "Failed to send. Please email me directly.");
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder-white/25 text-sm focus:outline-none focus:border-primary/40 focus:bg-primary/5 transition-all duration-200";

  return (
    <section id="contact" className="relative py-28 bg-[#070710]/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <SectionLabel>// contact</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's build something <span className="gradient-text-primary">together</span>
          </h2>
          <p className="text-white/45 max-w-xl text-lg leading-relaxed">
            Have a project in mind, a question, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Email card */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.06] mb-6 hover:border-primary/20 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Mail size={16} className="text-primary" />
                </div>
                <div className="text-sm font-semibold text-white/80">Email me directly</div>
              </div>
              <CopyEmail email={portfolioData.personal.email} />
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Send an email <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Location */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.06] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm font-semibold text-white/80">Location</span>
              </div>
              <p className="text-white/50 text-sm">{portfolioData.personal.location}</p>
              <p className="text-white/30 text-xs mt-1">Open to remote worldwide</p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-primary/20 hover:bg-primary/5 transition-all group"
                >
                  <span className="text-white/40 group-hover:text-primary transition-colors">{s.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{s.label}</div>
                    <div className="text-xs text-white/35">{s.desc}</div>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-white/20 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="glass-card rounded-2xl p-7 border border-white/[0.06]">
              <h3 className="font-display text-xl font-bold text-white/90 mb-6">Send a message</h3>

              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">Message sent!</h4>
                  <p className="text-white/50 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-xs text-primary underline">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/35 uppercase tracking-wider mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={inputClass}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/35 uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className={inputClass}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/35 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry / Job opportunity / Collaboration"
                      className={inputClass}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/35 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className={`${inputClass} resize-none`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl">
                      <AlertCircle size={15} />
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"}
                    className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-base hover:opacity-90 disabled:opacity-60 transition-opacity shadow-xl shadow-primary/20 mt-2">
                    {status === "loading" ? (
                      <><Loader2 size={18} className="animate-spin" />Sending...</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-0.5 transition-transform" />Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
