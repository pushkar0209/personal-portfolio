require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const About      = require("../models/About");
const Education  = require("../models/Education");
const Experience = require("../models/Experience");
const Project    = require("../models/Project");
const Skill      = require("../models/Skill");
const Admin      = require("../models/Admin");

const portfolioData = {
  personal: {
    name: "Pushkar Sagar Madhuri",
    title: "AI & ML Engineer",
    tagline: "Engineering Intelligence, One Model at a Time.",
    bio: "I build intelligent full-stack systems at the intersection of AI/ML and modern web development. My expertise spans time-series forecasting, deep learning pipelines, computer vision, and building production-ready applications that make complex AI accessible and actionable.",
    longBio: "Currently pursuing dual degrees in Applied AI & Data Science at IIT Jodhpur and Computer Science (AI & ML) at JNTUH. I've shipped 10+ end-to-end AI/ML systems — from fraud detection with XGBoost to real-time face recognition attendance — bridging the gap between cutting-edge ML research and beautiful user experiences.",
    email: "maduri15251@gmail.com",
    phone: "+91-7780344109",
    github: "https://github.com/pushkar-sagar",
    linkedin: "https://www.linkedin.com/in/pushkar-sagar-madhuri-003693330",
    twitter: "https://twitter.com",
    portfolio: "https://student-portfolio-khaki.vercel.app/",
    resume: "#",
    location: "Hyderabad, Telangana",
    availability: "Open to Opportunities",
  },
  stats: [
    { label: "Projects Shipped", value: "12", suffix: "+" },
    { label: "Degrees Pursuing", value: "2", suffix: "" },
    { label: "AI/ML Models Built", value: "10", suffix: "+" },
    { label: "Technologies", value: "20", suffix: "+" },
  ],
  education: [
    { institution: "IIT Jodhpur", degree: "B.Sc. in Applied AI and Data Science", duration: "Jan 2024 – Jun 2028", type: "Premier Institute", color: "#6366F1", highlights: ["Specialization in Applied Machine Learning & Neural Networks", "Time-series Forecasting and Predictive Analytics", "Research in AI-driven Decision Systems"] },
    { institution: "JNTUH University", degree: "B.Tech in Computer Science Engineering (AI & ML)", duration: "Sep 2023 – Jun 2027", type: "Engineering", color: "#06B6D4", highlights: ["Core: Data Structures, Algorithms, ML Fundamentals", "AI/ML stream with deep learning specialization", "Full-stack development track"] },
  ],
  experience: [
    { company: "Self-Initiated | AI/ML Project", role: "AI/ML & Full Stack Developer", period: "2024 – Present", location: "Remote", description: "Designed and developed a full-stack AI-driven Personal Finance Dashboard integrating time-series forecasting models (Prophet + LSTM) with an interactive React frontend and Flask backend APIs.", achievements: ["Implemented Prophet for trend + seasonality analysis", "Built LSTM deep learning model for multi-step expense prediction", "Created real-time interactive analytics dashboards with Chart.js", "Integrated end-to-end ML pipeline"], tech: ["React.js", "Flask", "Python", "Prophet", "LSTM", "Chart.js", "REST APIs"] },
    { company: "Self-Initiated | Web Development", role: "Full Stack Web Developer", period: "2023 – 2024", location: "Hyderabad, India", description: "Developed a fully responsive E-Commerce Platform with product listings, shopping cart, and checkout flow.", achievements: ["Built complete shopping experience: listings → cart → checkout", "Implemented mobile-first responsive design", "Structured codebase for scalability"], tech: ["HTML", "CSS", "JavaScript"] },
    { company: "Self-Initiated | UI/UX Project", role: "Frontend Developer", period: "2023 – 2024", location: "Hyderabad, India", description: "Designed and built a Hotel Booking Website with property listings, booking UI, and filtering.", achievements: ["Designed clean, service-focused booking interface", "Implemented property search and filtering", "Ensured full responsiveness"], tech: ["HTML", "CSS", "JavaScript"] },
  ],
  skills: [
    { category: "AI & Machine Learning", icon: "brain", color: "violet", items: [{ name: "Python", level: 90 }, { name: "LSTM / Deep Learning", level: 82 }, { name: "Prophet (Time-Series)", level: 85 }, { name: "Scikit-Learn", level: 80 }, { name: "Pandas / NumPy", level: 88 }, { name: "Computer Vision", level: 78 }, { name: "XGBoost", level: 80 }, { name: "Feature Engineering", level: 78 }] },
    { category: "Frontend Development", icon: "monitor", color: "cyan", items: [{ name: "React.js", level: 88 }, { name: "JavaScript (ES6+)", level: 90 }, { name: "HTML5 / CSS3", level: 92 }, { name: "Chart.js", level: 82 }, { name: "Responsive Design", level: 90 }, { name: "Next.js", level: 72 }, { name: "Framer Motion", level: 70 }, { name: "UI/UX Design", level: 80 }] },
    { category: "Backend & APIs", icon: "server", color: "emerald", items: [{ name: "Flask / FastAPI", level: 85 }, { name: "Node.js / Express", level: 78 }, { name: "REST API Design", level: 88 }, { name: "Python Backend", level: 87 }, { name: "MongoDB", level: 75 }, { name: "JWT Auth", level: 72 }, { name: "Model Integration", level: 83 }, { name: "Docker", level: 68 }] },
    { category: "Tools & Ecosystem", icon: "wrench", color: "amber", items: [{ name: "Git / GitHub", level: 88 }, { name: "Jupyter Notebooks", level: 90 }, { name: "Google Colab", level: 88 }, { name: "YOLOv8", level: 75 }, { name: "FaceNet / PyTorch", level: 75 }, { name: "Model Deployment", level: 75 }, { name: "VS Code", level: 95 }, { name: "Technical Research", level: 85 }] },
  ],
  projects: [
    {
      title: "AI Fraud Detection System",
      tagline: "Production-grade Hybrid Fraud Intelligence",
      description: "A production-ready AI system that detects fraudulent financial transactions using a hybrid XGBoost + Isolation Forest approach.",
      longDescription: "Built with a complete feature engineering pipeline, FastAPI inference server, and real-time alert system. XGBoost handles known fraud patterns while Isolation Forest detects novel attack vectors.",
      tech: ["Python", "XGBoost", "Isolation Forest", "FastAPI", "Scikit-Learn", "Pandas", "Redis"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-rose-500/25 via-red-500/10 to-transparent",
      accentColor: "#F43F5E",
      metrics: ["F1 > 0.92", "Hybrid ML", "REST API"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `def predict(features):\n    fraud_prob = clf_xgb.predict_proba(features)[0][1]\n    anomaly = clf_iso.predict(features)[0]\n    if fraud_prob > 0.8: return "BLOCK"\n    if fraud_prob > 0.5 or anomaly == -1: return "FLAG_FOR_REVIEW"\n    return "PASS"`,
    },
    {
      title: "Smart Attendance System",
      tagline: "Real-time Face Recognition & Web Dashboard",
      description: "A real-time smart attendance system powered by FaceNet (PyTorch) and OpenCV, with MTCNN face detection.",
      longDescription: "Achieves >98% recognition accuracy on trained embeddings. Features anti-spoofing and runtime model retraining.",
      tech: ["Python", "PyTorch", "FaceNet", "OpenCV", "MTCNN", "Flask"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-blue-500/25 via-cyan-500/10 to-transparent",
      accentColor: "#3B82F6",
      metrics: [">98% Accuracy", "Anti-Spoofing", "Live Dashboard"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `def recognize(frame):\n    faces = mtcnn(frame)\n    embs = embedder(faces)\n    dists = (embs - db_embs).norm(dim=1)\n    idx = dists.argmin()\n    return names[idx] if dists[idx] < THRESHOLD else "Unknown"`,
    },
    {
      title: "Driver Drowsiness Detection",
      tagline: "Real-time Safety Alert System via Computer Vision",
      description: "A real-time computer vision system that monitors driver alertness using facial landmark analysis.",
      longDescription: "Uses YOLOv8 for face detection combined with MediaPipe facial landmarks. EAR below threshold triggers alerts.",
      tech: ["Python", "YOLOv8", "MediaPipe", "OpenCV", "Playsound"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
      accentColor: "#F59E0B",
      metrics: ["30+ FPS", "EAR Algorithm", "Audio Alerts"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `if EAR < EAR_THRESHOLD:\n    FRAME_COUNTER += 1\n    if FRAME_COUNTER >= CONSEC_FRAMES:\n        play_alert("drowsy_warning.mp3")`,
    },
    {
      title: "ElectoGuide AI",
      tagline: "AI Civic Intelligence Platform for Indian Elections",
      description: "An AI-powered civic assistant that helps Indian citizens navigate the electoral process.",
      longDescription: "Localised for the Indian election system with ECI-compliant terminology. Features streaming AI chatbot.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-orange-500/25 via-yellow-500/10 to-transparent",
      accentColor: "#F97316",
      metrics: ["LLM-powered Q&A", "ECI Compliant", "Multi-language"],
      category: "Full Stack + AI",
      year: "2025",
      codeSnippet: `const response = await gemini.generateContentStream({\n  contents: [{ role: "user", parts: [{ text: query }] }],\n  systemInstruction: CIVIC_SYSTEM_PROMPT,\n});`,
    },
    {
      title: "Personal Finance Dashboard",
      tagline: "AI-Powered Financial Forecasting Platform",
      description: "A full-stack AI-driven financial analytics platform that predicts future expenses using time-series ML models.",
      longDescription: "Built with React.js frontend, Flask backend. Ingests transaction history and applies Prophet + LSTM.",
      tech: ["React.js", "Flask", "Python", "Prophet", "LSTM", "Chart.js"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-violet-500/25 via-indigo-500/10 to-transparent",
      accentColor: "#8B5CF6",
      metrics: ["Prophet + LSTM", "Real-time Charts", "Expense Forecast"],
      category: "Full Stack + AI",
      year: "2024",
      codeSnippet: `lstm_correction = lstm_model.predict(X_seq)\nfinal_forecast = forecast["yhat"] + lstm_correction`,
    },
    {
      title: "E-Commerce Platform",
      tagline: "Full-Featured Online Shopping Experience",
      description: "A complete, responsive e-commerce website featuring product listings and shopping cart.",
      longDescription: "Demonstrates mastery of core web development fundamentals. Hand-crafted UI components.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
      accentColor: "#06B6D4",
      metrics: ["Product Catalog", "Cart System", "Checkout Flow"],
      category: "Full Stack",
      year: "2023",
      codeSnippet: `const cart = {\n  add: (product) => {\n    const items = JSON.parse(localStorage.getItem('cart') || '[]');\n    items.push({ ...product, qty: 1 });\n    localStorage.setItem('cart', JSON.stringify(items));\n  }\n};`,
    },
    {
      title: "AI Resume Analyzer",
      tagline: "NLP-Powered Career Intelligence Platform",
      description: "An AI platform that parses resumes and scores them against job descriptions using NLP.",
      longDescription: "React + Flask full-stack app. Extracts skills/experience using spaCy/NLTK. Computes TF-IDF similarity.",
      tech: ["React.js", "Flask", "Python", "spaCy", "NLTK", "TF-IDF"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-indigo-500/25 via-blue-500/10 to-transparent",
      accentColor: "#6366F1",
      metrics: ["NLP Scoring", "ATS Feedback", "PDF Parsing"],
      category: "Full Stack + AI",
      year: "2025",
      codeSnippet: `def score_resume(resume_text, jd_text):\n    vectorizer = TfidfVectorizer(stop_words='english')\n    tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])\n    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])\n    return round(float(similarity[0][0]) * 100, 1)`,
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear and Seed About
    await About.deleteMany({});
    await About.create({
      ...portfolioData.personal,
      stats: portfolioData.stats
    });
    console.log("✅ About & Stats seeded");

    // Education
    await Education.deleteMany({});
    await Education.insertMany(portfolioData.education.map((e, i) => ({ ...e, order: i })));
    console.log("✅ Education seeded");

    // Experience
    await Experience.deleteMany({});
    await Experience.insertMany(portfolioData.experience.map((e, i) => ({ ...e, order: i })));
    console.log("✅ Experience seeded");

    // Projects
    await Project.deleteMany({});
    await Project.insertMany(portfolioData.projects.map((p, i) => ({ ...p, order: i })));
    console.log("✅ Projects seeded");

    // Skills
    await Skill.deleteMany({});
    await Skill.insertMany(portfolioData.skills.map((s, i) => ({ ...s, order: i })));
    console.log("✅ Skills seeded");

    // Admin
    await Admin.deleteMany({});
    const passwordHash = await Admin.hashPassword(process.env.ADMIN_PASSWORD || "changeme123");
    await Admin.create({ username: process.env.ADMIN_USERNAME || "pushkar", passwordHash });
    console.log("✅ Admin seeded");

    console.log("\n🎉 Full Database Seed Complete!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
