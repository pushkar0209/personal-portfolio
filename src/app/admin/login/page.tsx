"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await adminApi.login(form);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", data.username);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508]" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.08) 0%, #050508 60%)" }}>
      <div className="w-full max-w-md px-4">
        {/* Card */}
        <div className="glass-card rounded-3xl border border-white/[0.07] p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/30">
              <span className="font-display font-bold text-white text-xl">P</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-white/40 text-sm mt-1">Pushkar Sagar — Portfolio CMS</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-1.5">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="admin username" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 transition-all" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••" required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 transition-all" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-indigo-500/25 mt-2">
              {loading ? <><Loader2 size={17} className="animate-spin" />Signing in...</> : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-xs text-white/20 mt-6">
            Protected admin area · Portfolio CMS
          </p>
        </div>
      </div>
    </div>
  );
}
