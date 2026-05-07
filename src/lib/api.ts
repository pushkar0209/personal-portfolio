import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ── request interceptor — attach JWT if present ────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── response interceptor — global error logging ────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    return Promise.reject(err);
  }
);

// ═══════════════════════════════ PUBLIC APIS ══════════════════════════════════
export const aboutApi = {
  get: () => api.get("/about").then((r) => r.data),
};

export const educationApi = {
  getAll: () => api.get("/education").then((r) => r.data),
};

export const experienceApi = {
  getAll: () => api.get("/experience").then((r) => r.data),
};

export const projectsApi = {
  getAll: (params?: { category?: string; search?: string; featured?: boolean }) =>
    api.get("/projects", { params }).then((r) => r.data),
  getOne: (id: string) => api.get(`/projects/${id}`).then((r) => r.data),
};

export const skillsApi = {
  getAll: () => api.get("/skills").then((r) => r.data),
};

export const contactApi = {
  submit: (data: { name: string; email: string; subject?: string; message: string }) =>
    api.post("/contact", data).then((r) => r.data),
};

// ═══════════════════════════════ ADMIN APIS ═══════════════════════════════════
export const adminApi = {
  login:  (credentials: { username: string; password: string }) =>
    api.post("/admin/login", credentials).then((r) => r.data),
  getMe:  () => api.get("/admin/me").then((r) => r.data),

  // Projects
  createProject: (data: object) => api.post("/admin/projects", data).then((r) => r.data),
  updateProject: (id: string, data: object) => api.put(`/admin/projects/${id}`, data).then((r) => r.data),
  deleteProject: (id: string) => api.delete(`/admin/projects/${id}`).then((r) => r.data),

  // Skills
  createSkill: (data: object) => api.post("/admin/skills", data).then((r) => r.data),
  updateSkill: (id: string, data: object) => api.put(`/admin/skills/${id}`, data).then((r) => r.data),
  deleteSkill: (id: string) => api.delete(`/admin/skills/${id}`).then((r) => r.data),

  // Experience
  createExperience: (data: object) => api.post("/admin/experience", data).then((r) => r.data),
  updateExperience: (id: string, data: object) => api.put(`/admin/experience/${id}`, data).then((r) => r.data),
  deleteExperience: (id: string) => api.delete(`/admin/experience/${id}`).then((r) => r.data),

  // Messages
  getMessages: () => api.get("/contact/messages").then((r) => r.data),
  markRead:   (id: string) => api.patch(`/contact/${id}/read`).then((r) => r.data),

  // About
  updateAbout: (data: object) => api.put("/admin/about", data).then((r) => r.data),
};

export default api;
