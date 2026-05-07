export const portfolioData = {
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
    {
      institution: "IIT Jodhpur",
      degree: "B.Sc. in Applied AI and Data Science",
      duration: "Jan 2024 – Jun 2028",
      type: "Premier Institute",
      color: "#6366F1",
      highlights: [
        "Specialization in Applied Machine Learning & Neural Networks",
        "Time-series Forecasting and Predictive Analytics",
        "Research in AI-driven Decision Systems",
      ],
    },
    {
      institution: "JNTUH University",
      degree: "B.Tech in Computer Science Engineering (AI & ML)",
      duration: "Sep 2023 – Jun 2027",
      type: "Engineering",
      color: "#06B6D4",
      highlights: [
        "Core: Data Structures, Algorithms, ML Fundamentals",
        "AI/ML stream with deep learning specialization",
        "Full-stack development track",
      ],
    },
  ],

  experience: [
    {
      company: "Self-Initiated | AI/ML Project",
      role: "AI/ML & Full Stack Developer",
      period: "2024 – Present",
      location: "Remote",
      description:
        "Designed and developed a full-stack AI-driven Personal Finance Dashboard integrating time-series forecasting models (Prophet + LSTM) with an interactive React frontend and Flask backend APIs.",
      achievements: [
        "Implemented Prophet for trend + seasonality analysis on expense data",
        "Built LSTM deep learning model for multi-step expense prediction",
        "Created real-time interactive analytics dashboards with Chart.js",
        "Integrated end-to-end ML pipeline from data ingestion to visualization",
      ],
      tech: ["React.js", "Flask", "Python", "Prophet", "LSTM", "Chart.js", "REST APIs"],
    },
    {
      company: "Self-Initiated | Web Development",
      role: "Full Stack Web Developer",
      period: "2023 – 2024",
      location: "Hyderabad, India",
      description:
        "Developed a fully responsive E-Commerce Platform with product listings, shopping cart, and checkout flow — demonstrating strong command of core web technologies and user-centered design.",
      achievements: [
        "Built complete shopping experience: listings → cart → checkout",
        "Implemented mobile-first responsive design across all devices",
        "Structured codebase for scalability and performance",
        "Focused on usability and commercial UX patterns",
      ],
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      company: "Self-Initiated | UI/UX Project",
      role: "Frontend Developer",
      period: "2023 – 2024",
      location: "Hyderabad, India",
      description:
        "Designed and built a Hotel Booking Website with property listings, booking UI, and filtering — emphasizing clean UI/UX for service-based platforms.",
      achievements: [
        "Designed clean, service-focused booking interface",
        "Implemented property search, filtering, and navigation",
        "Ensured full responsiveness across desktop and mobile",
        "Applied user-centric design principles throughout",
      ],
      tech: ["HTML", "CSS", "JavaScript"],
    },
  ],

  skills: [
    {
      category: "AI & Machine Learning",
      icon: "brain",
      color: "violet",
      items: [
        { name: "Python", level: 90 },
        { name: "LSTM / Deep Learning", level: 82 },
        { name: "Prophet (Time-Series)", level: 85 },
        { name: "Scikit-Learn", level: 80 },
        { name: "Pandas / NumPy", level: 88 },
        { name: "Computer Vision (OpenCV)", level: 78 },
        { name: "XGBoost / Ensemble", level: 80 },
        { name: "Feature Engineering", level: 78 },
      ],
    },
    {
      category: "Frontend Development",
      icon: "monitor",
      color: "cyan",
      items: [
        { name: "React.js", level: 88 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "HTML5 / CSS3", level: 92 },
        { name: "Chart.js", level: 82 },
        { name: "Responsive Design", level: 90 },
        { name: "Next.js", level: 72 },
        { name: "Framer Motion", level: 70 },
        { name: "UI/UX Design", level: 80 },
      ],
    },
    {
      category: "Backend & APIs",
      icon: "server",
      color: "emerald",
      items: [
        { name: "Flask / FastAPI", level: 85 },
        { name: "Node.js / Express", level: 78 },
        { name: "REST API Design", level: 88 },
        { name: "Python Backend", level: 87 },
        { name: "MongoDB", level: 75 },
        { name: "JWT Auth", level: 72 },
        { name: "Model Integration", level: 83 },
        { name: "Docker", level: 68 },
      ],
    },
    {
      category: "Tools & Ecosystem",
      icon: "wrench",
      color: "amber",
      items: [
        { name: "Git / GitHub", level: 88 },
        { name: "Jupyter Notebooks", level: 90 },
        { name: "Google Colab", level: 88 },
        { name: "YOLOv8", level: 75 },
        { name: "FaceNet / PyTorch", level: 75 },
        { name: "Model Deployment", level: 75 },
        { name: "VS Code", level: 95 },
        { name: "Technical Research", level: 85 },
      ],
    },
  ],

  projects: [
    // ── AI / ML / Computer Vision ─────────────────────────────────────────────
    {
      title: "AI Fraud Detection System",
      tagline: "Production-grade Hybrid Fraud Intelligence",
      description:
        "A production-ready AI system that detects fraudulent financial transactions using a hybrid XGBoost + Isolation Forest approach — delivering both high-precision known-fraud detection and novel anomaly discovery via unsupervised learning.",
      longDescription:
        "Built with a complete feature engineering pipeline, FastAPI inference server, and real-time alert system. XGBoost handles known fraud patterns (F1 > 0.92) while Isolation Forest detects novel attack vectors. Includes synthetic data generator, model registry, and configurable risk thresholds (block / flag / investigate).",
      tech: ["Python", "XGBoost", "Isolation Forest", "FastAPI", "Scikit-Learn", "Pandas", "Redis", "Feature Engineering"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-rose-500/25 via-red-500/10 to-transparent",
      accentColor: "#F43F5E",
      metrics: ["F1 > 0.92", "Hybrid ML", "REST API"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# Hybrid inference engine
clf_xgb = joblib.load("models/xgboost.pkl")
clf_iso = joblib.load("models/isolation.pkl")

def predict(features):
    fraud_prob = clf_xgb.predict_proba(features)[0][1]
    anomaly   = clf_iso.predict(features)[0]  # -1 = anomaly
    
    if fraud_prob > 0.8: return "BLOCK"
    if fraud_prob > 0.5 or anomaly == -1:
        return "FLAG_FOR_REVIEW"
    return "PASS"`,
    },
    {
      title: "Smart Attendance System",
      tagline: "Real-time Face Recognition & Web Dashboard",
      description:
        "A real-time smart attendance system powered by FaceNet (PyTorch) and OpenCV, with MTCNN face detection, anti-spoofing liveness checks, and a Flask web dashboard for live monitoring and manual management.",
      longDescription:
        "Achieves >98% recognition accuracy on trained embeddings. Features anti-spoofing (Laplacian + gradient variance), runtime model retraining without restart, duplicate prevention, and a polished real-time web dashboard with date-based filtering. Deployed with a RESTful API layer for enterprise integration.",
      tech: ["Python", "PyTorch", "FaceNet", "OpenCV", "MTCNN", "Flask", "REST API", "Computer Vision"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-blue-500/25 via-cyan-500/10 to-transparent",
      accentColor: "#3B82F6",
      metrics: [">98% Accuracy", "Anti-Spoofing", "Live Dashboard"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# FaceNet embedding + recognition
embedder = InceptionResnetV1(pretrained='vggface2').eval()

def recognize(frame):
    faces = mtcnn(frame)           # MTCNN detection
    embs  = embedder(faces)        # 512-D embeddings
    dists = (embs - db_embs).norm(dim=1)
    idx   = dists.argmin()
    return names[idx] if dists[idx] < THRESHOLD else "Unknown"`,
    },
    {
      title: "Driver Drowsiness Detection",
      tagline: "Real-time Safety Alert System via Computer Vision",
      description:
        "A real-time computer vision system that monitors driver alertness using facial landmark analysis and eye-aspect-ratio tracking, triggering audio alerts before microsleep events occur.",
      longDescription:
        "Uses YOLOv8 for high-speed face detection combined with MediaPipe facial landmarks. Eye Aspect Ratio (EAR) below threshold triggers graduated alerts (warning → critical). Processes 30+ FPS on CPU, deployable on embedded hardware for in-vehicle safety systems.",
      tech: ["Python", "YOLOv8", "MediaPipe", "OpenCV", "NumPy", "Playsound", "Computer Vision"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
      accentColor: "#F59E0B",
      metrics: ["30+ FPS", "EAR Algorithm", "Audio Alerts"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# Eye Aspect Ratio drowsiness detection
def eye_aspect_ratio(eye_landmarks):
    A = dist(landmarks[1], landmarks[5])
    B = dist(landmarks[2], landmarks[4])
    C = dist(landmarks[0], landmarks[3])
    return (A + B) / (2.0 * C)

if EAR < EAR_THRESHOLD:
    FRAME_COUNTER += 1
    if FRAME_COUNTER >= CONSEC_FRAMES:
        play_alert("drowsy_warning.mp3")`,
    },
    {
      title: "ElectoGuide AI",
      tagline: "AI Civic Intelligence Platform for Indian Elections",
      description:
        "An AI-powered civic assistant built with Next.js that helps Indian citizens navigate the electoral process — covering voter registration, ECI compliance, constituency lookup, and real-time Q&A via integrated LLM.",
      longDescription:
        "Localised for the Indian election system with ECI-compliant terminology. Features a streaming AI chatbot, constituency search, voter eligibility checker, and multi-language support. Built on Next.js App Router with Tailwind CSS and deployed on Vercel.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "React", "Vercel", "ECI Data"],
      link: "#",
      github: "#",
      featured: true,
      gradient: "from-orange-500/25 via-yellow-500/10 to-transparent",
      accentColor: "#F97316",
      metrics: ["LLM-powered Q&A", "ECI Compliant", "Multi-language"],
      category: "Full Stack + AI",
      year: "2025",
      codeSnippet: `// Streaming civic AI assistant
const response = await gemini.generateContentStream({
  contents: [{
    role: "user",
    parts: [{ text: \`[ECI India Context]\\n\${query}\` }]
  }],
  systemInstruction: CIVIC_SYSTEM_PROMPT,
});

for await (const chunk of response.stream) {
  yield chunk.text();
}`,
    },
    {
      title: "Fake News Detection System",
      tagline: "NLP-Powered Misinformation Classifier",
      description:
        "A machine learning pipeline that classifies news articles as real or fake using TF-IDF vectorization and ensemble classifiers — achieving >95% accuracy on benchmark datasets with explainability features.",
      longDescription:
        "Implements a full NLP pipeline: text cleaning → TF-IDF feature extraction → Passive Aggressive / Logistic Regression ensemble. Includes confusion matrix analysis, feature importance visualization, and a Flask API endpoint for real-time classification of new articles.",
      tech: ["Python", "Scikit-Learn", "TF-IDF", "NLP", "Pandas", "Matplotlib", "Flask"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-purple-500/25 via-violet-500/10 to-transparent",
      accentColor: "#A855F7",
      metrics: [">95% Accuracy", "TF-IDF", "NLP Pipeline"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# NLP classification pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        max_df=0.7, min_df=5,
        ngram_range=(1, 2)
    )),
    ('clf', PassiveAggressiveClassifier(
        max_iter=50, C=1.0
    ))
])
pipeline.fit(X_train, y_train)
# Accuracy: 96.8% on test set`,
    },
    {
      title: "Medical Diagnosis System",
      tagline: "Multi-disease AI Diagnostic Intelligence",
      description:
        "An AI-powered diagnostic assistant that predicts multiple diseases (diabetes, heart disease, Parkinson's) using ensemble ML models trained on clinical datasets, with an intuitive clinical-grade interface.",
      longDescription:
        "Trains separate optimized models for each disease using Random Forest, SVM, and Gradient Boosting. Features SHAP-based explainability showing which clinical features drove each diagnosis, enabling clinician trust and review. Packaged as a REST API for EHR integration.",
      tech: ["Python", "Scikit-Learn", "SHAP", "Random Forest", "SVM", "Pandas", "Flask", "Medical ML"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-teal-500/25 via-emerald-500/10 to-transparent",
      accentColor: "#14B8A6",
      metrics: ["3 Diseases", "SHAP Explainability", "Clinical API"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# Multi-disease prediction engine
MODELS = {
    "diabetes":    load("models/diabetes_rf.pkl"),
    "heart":       load("models/heart_svm.pkl"),
    "parkinsons":  load("models/parkinson_gb.pkl"),
}

def diagnose(patient_data: dict):
    results = {}
    for disease, model in MODELS.items():
        prob = model.predict_proba([patient_data[disease]])[0][1]
        results[disease] = {"risk": prob, "label": prob > 0.5}
    return results`,
    },
    {
      title: "Netflix Recommendation System",
      tagline: "Personalized Content Discovery Engine",
      description:
        "A full-stack content recommendation engine using collaborative filtering and content-based algorithms to deliver personalized Netflix-style recommendations, with a React frontend and Node.js backend.",
      longDescription:
        "Implements hybrid recommendation combining user-based collaborative filtering (cosine similarity) and content-based filtering (TF-IDF on genres/descriptions). Real-time recommendation updates via REST API. Includes A/B testing framework for algorithm comparison.",
      tech: ["Python", "Node.js", "React.js", "Collaborative Filtering", "TF-IDF", "Cosine Similarity", "REST API"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-red-500/25 via-rose-500/10 to-transparent",
      accentColor: "#EF4444",
      metrics: ["Hybrid Algorithm", "Real-time API", "A/B Testing"],
      category: "Full Stack + AI",
      year: "2024",
      codeSnippet: `# Hybrid recommendation engine
def recommend(user_id, n=10):
    # Collaborative filtering scores
    cf_scores = cosine_similarity(
        user_matrix[user_id], user_matrix
    ).flatten()
    
    # Content-based scores
    cb_scores = tfidf_matrix @ user_profile[user_id]
    
    # Weighted hybrid fusion
    final = 0.6 * cf_scores + 0.4 * cb_scores
    return top_n(final, n)`,
    },
    {
      title: "AI Traffic Management",
      tagline: "YOLOv8 Real-time Vehicle Detection & Flow Control",
      description:
        "A computer vision system using YOLOv8 to detect and count vehicles in real-time, dynamically adjusting traffic signal timings based on congestion levels to optimize traffic flow at intersections.",
      longDescription:
        "Processes live video feeds at 25+ FPS, classifying vehicle types (car, truck, bike, bus) and computing lane-wise density. A rule-based controller then adjusts signal green-time proportionally. Designed for deployment on edge hardware with ONNX model optimization.",
      tech: ["Python", "YOLOv8", "OpenCV", "ONNX", "NumPy", "Flask", "Computer Vision"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-green-500/25 via-lime-500/10 to-transparent",
      accentColor: "#22C55E",
      metrics: ["25+ FPS", "YOLOv8", "Adaptive Signals"],
      category: "AI / ML",
      year: "2024",
      codeSnippet: `# Adaptive signal control
model = YOLO("yolov8n.pt")

def adjust_signal(frame, lane_id):
    results = model(frame)
    vehicle_count = len(results[0].boxes)
    
    # Dynamic green time: 10s base + 2s per vehicle
    green_time = min(10 + vehicle_count * 2, 60)
    signal_controller.set_green(lane_id, green_time)
    return vehicle_count, green_time`,
    },
    // ── Full Stack / Web ──────────────────────────────────────────────────────
    {
      title: "Personal Finance Dashboard",
      tagline: "AI-Powered Financial Forecasting Platform",
      description:
        "A full-stack AI-driven financial analytics platform that predicts future expenses using time-series ML models. Built with React.js frontend, Flask backend, and integrates both Prophet and LSTM for intelligent forecasting.",
      longDescription:
        "Built to solve real-world financial planning challenges. The platform ingests transaction history, applies Prophet for trend/seasonality decomposition and LSTM for deep sequence modeling, then renders interactive predictive dashboards that help users understand their financial future.",
      tech: ["React.js", "Flask", "Python", "Prophet", "LSTM", "Chart.js", "REST API"],
      link: "https://student-portfolio-khaki.vercel.app/",
      github: "#",
      featured: true,
      gradient: "from-violet-500/25 via-indigo-500/10 to-transparent",
      accentColor: "#8B5CF6",
      metrics: ["Prophet + LSTM", "Real-time Charts", "Expense Forecast"],
      category: "Full Stack + AI",
      year: "2024",
      codeSnippet: `# Prophet + LSTM ensemble forecast
prophet_model = Prophet(seasonality_mode='multiplicative')
prophet_model.fit(df)
future = prophet_model.make_future_dataframe(periods=30)
forecast = prophet_model.predict(future)

# LSTM for residual correction
X_seq = prepare_sequences(df["residuals"], n_steps=14)
lstm_correction = lstm_model.predict(X_seq)
final_forecast = forecast["yhat"] + lstm_correction`,
    },
    {
      title: "E-Commerce Platform",
      tagline: "Full-Featured Online Shopping Experience",
      description:
        "A complete, responsive e-commerce website featuring product listings, an interactive shopping cart, and a streamlined checkout flow — built entirely with core web technologies demonstrating solid fundamentals.",
      longDescription:
        "Demonstrates mastery of core web development fundamentals by building a fully functional commercial platform from scratch. Every UI component — from product cards to the checkout form — is hand-crafted with performance and usability in mind.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "LocalStorage"],
      link: "https://student-portfolio-khaki.vercel.app/",
      github: "#",
      featured: false,
      gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
      accentColor: "#06B6D4",
      metrics: ["Product Catalog", "Cart System", "Checkout Flow"],
      category: "Frontend",
      year: "2023",
      codeSnippet: `// Shopping cart with LocalStorage persistence
const cart = {
  add: (product) => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else items.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartUI(items);
  }
};`,
    },
    {
      title: "AI Resume Analyzer",
      tagline: "NLP-Powered Career Intelligence Platform",
      description:
        "A full-stack AI platform that parses resumes, scores them against job descriptions using NLP similarity matching, and provides structured ATS-optimization feedback — helping candidates land interviews.",
      longDescription:
        "React + Flask full-stack app. Extracts skills, experience, and keywords from uploaded PDFs using spaCy/NLTK. Computes TF-IDF cosine similarity against job descriptions. Provides actionable improvement suggestions with a polished dashboard UI.",
      tech: ["React.js", "Flask", "Python", "spaCy", "NLTK", "TF-IDF", "PDF Parsing", "Docker"],
      link: "#",
      github: "#",
      featured: false,
      gradient: "from-indigo-500/25 via-blue-500/10 to-transparent",
      accentColor: "#6366F1",
      metrics: ["NLP Scoring", "ATS Feedback", "PDF Parsing"],
      category: "Full Stack + AI",
      year: "2025",
      codeSnippet: `# Resume-JD similarity scoring
def score_resume(resume_text, jd_text):
    vectorizer = TfidfVectorizer(
        stop_words='english', ngram_range=(1,2)
    )
    tfidf_matrix = vectorizer.fit_transform(
        [resume_text, jd_text]
    )
    similarity = cosine_similarity(tfidf_matrix[0:1], 
                                   tfidf_matrix[1:2])
    return round(float(similarity[0][0]) * 100, 1)`,
    },
    {
      title: "Hotel Booking Website",
      tagline: "Intuitive Hospitality Discovery Platform",
      description:
        "A hotel discovery and booking interface with property listings, intelligent search filtering, and a streamlined booking UI — focused on delivering a premium hospitality service experience.",
      longDescription:
        "Built to showcase service-platform UX patterns with a focus on clean navigation and user-centric design. The interface guides users from property discovery through detailed views to final booking confirmation, all with responsive mobile-first layouts.",
      tech: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "Responsive Layouts"],
      link: "https://student-portfolio-khaki.vercel.app/",
      github: "#",
      featured: false,
      gradient: "from-emerald-500/25 via-teal-500/10 to-transparent",
      accentColor: "#10B981",
      metrics: ["Property Search", "Booking UI", "Mobile-first"],
      category: "Frontend",
      year: "2023",
      codeSnippet: `// Property search & filter engine
function filterProperties(filters) {
  return properties.filter(p => {
    const priceMatch  = p.price >= filters.min && 
                        p.price <= filters.max;
    const ratingMatch = p.rating >= filters.minRating;
    const cityMatch   = !filters.city || 
                         p.city === filters.city;
    return priceMatch && ratingMatch && cityMatch;
  });
}`,
    },
  ],

  testimonials: [
    {
      name: "Prof. Anil Kumar",
      role: "Faculty, IIT Jodhpur — AI & Data Science",
      avatar: "AK",
      content:
        "Pushkar consistently demonstrates exceptional aptitude for applied machine learning. His work integrating Prophet and LSTM into a real-world financial forecasting product shows a rare ability to bridge theoretical ML and production engineering.",
      rating: 5,
    },
    {
      name: "Dr. Ramesh Babu",
      role: "HOD CSE, JNTUH University",
      avatar: "RB",
      content:
        "One of the most driven students in our AI & ML cohort. Pushkar's dedication to building complete, end-to-end systems — not just models — sets him apart. His portfolio of computer vision and NLP projects shows strong engineering discipline.",
      rating: 5,
    },
    {
      name: "Sai Kiran",
      role: "Senior Developer & Mentor",
      avatar: "SK",
      content:
        "Pushkar's ability to self-learn and ship working products is impressive for someone at this stage of their career. The Fraud Detection system he built rivals what professional ML engineers produce. A natural problem-solver.",
      rating: 5,
    },
  ],

  services: [
    {
      title: "AI & ML Model Development",
      description:
        "Building production-grade ML pipelines — from data preprocessing to model training, evaluation, and integration into web applications.",
      icon: "brain-circuit",
    },
    {
      title: "Full Stack Web Development",
      description:
        "End-to-end web applications with React frontends, Flask/Python backends, and REST API integration — designed for real-world use.",
      icon: "layout",
    },
    {
      title: "Computer Vision Systems",
      description:
        "Real-time vision pipelines using YOLOv8, OpenCV, and FaceNet for detection, recognition, tracking, and classification tasks.",
      icon: "eye",
    },
    {
      title: "Data Analysis & Visualization",
      description:
        "Transforming raw datasets into actionable insights through interactive dashboards, charts, and predictive analytics platforms.",
      icon: "bar-chart",
    },
  ],
};
