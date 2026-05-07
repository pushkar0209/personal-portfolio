"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminApi, projectsApi, contactApi, skillsApi, experienceApi } from "@/lib/api";
import type { LucideIcon } from "lucide-react";
import { LogOut, FolderOpen, Wrench, Briefcase, Mail, Plus, Trash2, Edit2, RefreshCw, X, Check, Loader2, LayoutDashboard, Star } from "lucide-react";

// ── types ─────────────────────────────────────────────────────────────────────
interface Project { _id: string; title: string; tagline: string; description: string; tech: string[]; link: string; github: string; featured: boolean; category: string; }
interface Message { _id: string; name: string; email: string; subject: string; message: string; read: boolean; createdAt: string; }
interface Skill { _id: string; category: string; icon: string; color: string; items: { name: string; level: number }[]; }
interface Experience { _id: string; company: string; role: string; period: string; location: string; description: string; achievements: string[]; tech: string[]; }

// ── small components ──────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: LucideIcon; color: string }) {
  return (
    <div className={`glass-card rounded-2xl border p-5 flex items-center gap-4 ${color}`}>
      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
        <Icon size={20} className="text-white/60" />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-white">{value}</div>
        <div className="text-xs text-white/40 font-mono">{label}</div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h3 className="font-display font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const inp = "w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm placeholder-white/25 focus:outline-none focus:border-indigo-500/40 transition-all";
const lbl = "block text-xs font-mono text-white/35 mb-1";

// ── project form ──────────────────────────────────────────────────────────────
function ProjectForm({ initial, onSave, onClose }: { initial?: Partial<Project>; onSave: (data: object) => Promise<void>; onClose: () => void }) {
  const initialTech = initial?.tech?.join(", ") || "";
  const [form, setForm] = useState({ title: "", tagline: "", description: "", link: "", github: "", category: "Full Stack", featured: false, ...initial, tech: initialTech });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    await onSave({ ...form, tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean) });
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div><label className={lbl}>Title *</label><input className={inp} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Project title" /></div>
      <div><label className={lbl}>Tagline</label><input className={inp} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Short description" /></div>
      <div><label className={lbl}>Description *</label><textarea className={`${inp} resize-none`} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className={lbl}>Technologies (comma-separated)</label><input className={inp} value={form.tech} onChange={(e) => set("tech", e.target.value)} placeholder="React.js, Python, Flask" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Live URL</label><input className={inp} value={form.link} onChange={(e) => set("link", e.target.value)} /></div>
        <div><label className={lbl}>GitHub</label><input className={inp} value={form.github} onChange={(e) => set("github", e.target.value)} /></div>
      </div>
      <div><label className={lbl}>Category</label>
        <select className={inp} value={form.category} onChange={(e) => set("category", e.target.value)}>
          {["Full Stack", "Full Stack + AI", "Frontend", "Backend", "AI/ML"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-indigo-500" />
        <span className="text-sm text-white/60">Featured project</span>
      </label>
      <div className="flex gap-3 mt-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
        <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Save
        </button>
      </div>
    </div>
  );
}

// ── skill form ──────────────────────────────────────────────────────────────
function SkillForm({ initial, onSave, onClose }: { initial?: Partial<Skill>; onSave: (data: object) => Promise<void>; onClose: () => void }) {
  const [form, setForm] = useState({ category: "", icon: "brain", color: "violet", ...initial });
  const [items, setItems] = useState(initial?.items || [{ name: "", level: 80 }]);
  const [saving, setSaving] = useState(false);

  const addItem = () => setItems([...items, { name: "", level: 80 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, k: string, v: string | number) => {
    const next = [...items];
    next[i] = { ...next[i], [k]: v };
    setItems(next);
  };

  const save = async () => {
    setSaving(true);
    await onSave({ ...form, items: items.filter(it => it.name.trim()) });
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div><label className={lbl}>Category *</label><input className={inp} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Frontend Development" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Icon</label>
          <select className={inp} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {["brain", "monitor", "server", "wrench"].map(i => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div><label className={lbl}>Color Theme</label>
          <select className={inp} value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
            {["violet", "cyan", "emerald", "amber"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>Skills & Levels</label>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
          {items.map((it, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inp} flex-1`} value={it.name} onChange={e => updateItem(i, "name", e.target.value)} placeholder="Skill name" />
              <input className={`${inp} w-20 text-center`} type="number" value={it.level} onChange={e => updateItem(i, "level", parseInt(e.target.value))} />
              <button onClick={() => removeItem(i)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-indigo-400 flex items-center gap-1 hover:underline"><Plus size={12} /> Add Skill Item</button>
      </div>
      <div className="flex gap-3 mt-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
        <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Save
        </button>
      </div>
    </div>
  );
}

// ── experience form ───────────────────────────────────────────────────────────
function ExperienceForm({ initial, onSave, onClose }: { initial?: Partial<Experience>; onSave: (data: object) => Promise<void>; onClose: () => void }) {
  const initialAch = initial?.achievements?.join("\n") || "";
  const initialTech = initial?.tech?.join(", ") || "";
  const [form, setForm] = useState({ company: "", role: "", period: "", location: "", description: "", ...initial, achievements: initialAch, tech: initialTech });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    await onSave({
      ...form,
      achievements: form.achievements.split("\n").map(a => a.trim()).filter(Boolean),
      tech: form.tech.split(",").map(t => t.trim()).filter(Boolean)
    });
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Company *</label><input className={inp} value={form.company} onChange={e => set("company", e.target.value)} /></div>
        <div><label className={lbl}>Role *</label><input className={inp} value={form.role} onChange={e => set("role", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Period</label><input className={inp} value={form.period} onChange={e => set("period", e.target.value)} placeholder="e.g. 2024 - Present" /></div>
        <div><label className={lbl}>Location</label><input className={inp} value={form.location} onChange={e => set("location", e.target.value)} /></div>
      </div>
      <div><label className={lbl}>Description</label><textarea className={`${inp} resize-none`} rows={2} value={form.description} onChange={e => set("description", e.target.value)} /></div>
      <div><label className={lbl}>Achievements (one per line)</label><textarea className={`${inp} resize-none font-sans`} rows={4} value={form.achievements} onChange={e => set("achievements", e.target.value)} placeholder="• Key responsibility..." /></div>
      <div><label className={lbl}>Tech Stack (comma-separated)</label><input className={inp} value={form.tech} onChange={e => set("tech", e.target.value)} /></div>
      <div className="flex gap-3 mt-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
        <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Save
        </button>
      </div>
    </div>
  );
}

// ── main dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "messages" | "skills" | "experience">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [username, setUsername] = useState("admin");

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, m, s, e] = await Promise.all([
        projectsApi.getAll(),
        adminApi.getMessages(),
        skillsApi.getAll(),
        experienceApi.getAll()
      ]);
      setProjects(p);
      setMessages(m);
      setSkills(s);
      setExperience(e);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { router.push("/admin/login"); return; }
    setUsername(localStorage.getItem("adminUser") || "admin");
    loadAll();
  }, [loadAll, router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  // Generic CRUD helpers
  const deleteItem = async (type: string, id: string) => {
    if (!confirm(`Delete this ${type}?`)) return;
    if (type === "project") { await adminApi.deleteProject(id); setProjects(p => p.filter(x => x._id !== id)); }
    if (type === "skill") { await adminApi.deleteSkill(id); setSkills(s => s.filter(x => x._id !== id)); }
    if (type === "experience") { await adminApi.deleteExperience(id); setExperience(e => e.filter(x => x._id !== id)); }
  };

  const saveItem = async (data: object) => {
    try {
      if (tab === "projects") {
        if (editTarget) {
          const res = await adminApi.updateProject(editTarget._id, data);
          setProjects(prev => prev.map(p => p._id === res._id ? res : p));
        } else {
          const res = await adminApi.createProject(data);
          setProjects(prev => [res, ...prev]);
        }
      } else if (tab === "skills") {
        if (editTarget) {
          const res = await adminApi.updateSkill(editTarget._id, data);
          setSkills(prev => prev.map(s => s._id === res._id ? res : s));
        } else {
          const res = await adminApi.createSkill(data);
          setSkills(prev => [res, ...prev]);
        }
      } else if (tab === "experience") {
        if (editTarget) {
          const res = await adminApi.updateExperience(editTarget._id, data);
          setExperience(prev => prev.map(e => e._id === res._id ? res : e));
        } else {
          const res = await adminApi.createExperience(data);
          setExperience(prev => [res, ...prev]);
        }
      }
      setModal(null);
      setEditTarget(null);
    } catch (err) { alert("Failed to save item"); }
  };

  const markRead = async (id: string) => {
    await adminApi.markRead(id);
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
  };

  const tabs = [
    { id: "projects" as const, label: "Projects", icon: FolderOpen },
    { id: "skills" as const, label: "Skills", icon: Wrench },
    { id: "experience" as const, label: "Experience", icon: Briefcase },
    { id: "messages" as const, label: `Inbox ${messages.filter(m => !m.read).length > 0 ? `(${messages.filter(m => !m.read).length})` : ""}`, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-60 bg-white/[0.02] border-r border-white/[0.05] flex flex-col z-20">
        <div className="p-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">{username}</div>
              <div className="text-[10px] text-white/30 font-mono">Portfolio Admin</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          <div className="text-[9px] font-mono text-white/20 px-2 py-1 uppercase tracking-widest">Navigation</div>
          <button onClick={() => router.push("/")} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm">
            <LayoutDashboard size={15} /> View Portfolio
          </button>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-sm ${tab === t.id ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/[0.05]">
          <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-60 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white capitalize">{tab}</h1>
            <p className="text-white/35 text-sm mt-0.5 font-mono">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadAll} className="p-2.5 rounded-xl border border-white/[0.06] text-white/40 hover:text-white hover:border-white/15 transition-all">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            {tab !== "messages" && (
              <button onClick={() => { setEditTarget(null); setModal("add"); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors">
                <Plus size={15} /> Add {tab.slice(0, -1)}
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Projects" value={projects.length} icon={FolderOpen} color="border-indigo-500/20" />
          <StatCard label="Skills" value={skills.length} icon={Wrench} color="border-cyan-500/20" />
          <StatCard label="Exp." value={experience.length} icon={Briefcase} color="border-violet-500/20" />
          <StatCard label="Unread" value={messages.filter(m => !m.read).length} icon={Mail} color="border-rose-500/20" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64"><Loader2 size={32} className="animate-spin text-indigo-400" /></div>
        ) : (
          <div className="space-y-4">
            {tab === "projects" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div key={p._id} className="glass-card rounded-2xl border border-white/[0.06] p-5 hover:border-indigo-500/20 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-white/90 text-sm flex items-center gap-2">
                          {p.title} {p.featured && <Star size={12} className="text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="text-xs text-white/40 font-mono mt-0.5">{p.category}</div>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditTarget(p); setModal("edit"); }} className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-white/40 hover:text-indigo-400 transition-all"><Edit2 size={13} /></button>
                        <button onClick={() => deleteItem("project", p._id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 transition-all"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs line-clamp-2 mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech?.slice(0, 4).map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/35">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "skills" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {skills.map((s) => (
                  <div key={s._id} className="glass-card rounded-2xl border border-white/[0.06] p-5 hover:border-cyan-500/20 transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white/90 text-sm">{s.category}</div>
                        <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider">{s.color} · {s.icon}</div>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditTarget(s); setModal("edit"); }} className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400 transition-all"><Edit2 size={13} /></button>
                        <button onClick={() => deleteItem("skill", s._id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 transition-all"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((it, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white/5 text-white/50">{it.name} <span className="text-indigo-400">{it.level}%</span></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "experience" && (
              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e._id} className="glass-card rounded-2xl border border-white/[0.06] p-6 hover:border-violet-500/20 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-white text-lg">{e.role}</div>
                        <div className="text-indigo-400 font-semibold">{e.company}</div>
                        <div className="text-xs text-white/30 font-mono mt-1">{e.period} · {e.location}</div>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditTarget(e); setModal("edit"); }} className="p-2 rounded-lg bg-white/5 hover:bg-violet-500/20 text-white/40 hover:text-violet-400 transition-all"><Edit2 size={15} /></button>
                        <button onClick={() => deleteItem("experience", e._id)} className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 transition-all"><Trash2 size={15} /></button>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">{e.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {e.tech.map(t => <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white/5 text-white/40">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "messages" && (
              messages.length === 0 ? <div className="text-center text-white/30 py-20 font-mono">No messages yet</div> : (
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <div key={m._id} className={`glass-card rounded-2xl border p-5 transition-colors ${m.read ? "border-white/[0.04] opacity-60" : "border-violet-500/20"}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-semibold text-white/90 text-sm">{m.name}</span>
                          <span className="text-white/30 text-xs mx-2">·</span>
                          <span className="text-xs font-mono text-white/40">{m.email}</span>
                          {!m.read && <span className="ml-2 text-[9px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">NEW</span>}
                        </div>
                        <div className="text-xs text-white/25 font-mono">{new Date(m.createdAt).toLocaleDateString()}</div>
                      </div>
                      <p className="text-white/40 text-sm">{m.message}</p>
                      {!m.read && <button onClick={() => markRead(m._id)} className="mt-3 text-xs text-violet-400 hover:underline">Mark as read</button>}
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <Modal title={`${modal === "add" ? "Add" : "Edit"} ${tab.slice(0, -1)}`} onClose={() => { setModal(null); setEditTarget(null); }}>
          {tab === "projects" && <ProjectForm initial={editTarget} onSave={saveItem} onClose={() => setModal(null)} />}
          {tab === "skills" && <SkillForm initial={editTarget} onSave={saveItem} onClose={() => setModal(null)} />}
          {tab === "experience" && <ExperienceForm initial={editTarget} onSave={saveItem} onClose={() => setModal(null)} />}
        </Modal>
      )}
    </div>
  );
}
