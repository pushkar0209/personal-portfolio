# Pushkar Sagar Madhuri — Developer Portfolio

A full-stack developer portfolio with an animated Next.js frontend, Node.js/Express backend API, and MongoDB integration.

## 🚀 Tech Stack

**Frontend**
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Three.js + @react-three/fiber (3D visuals)
- Lucide React (icons)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (admin panel)
- Nodemailer (contact form emails)

---

## 🛠️ Local Development Setup

### 1. Install frontend dependencies
```bash
npm install
```

### 2. Install backend dependencies
```bash
npm run backend:install
# or: cd backend && npm install
```

### 3. Configure environment variables

**Frontend** — already configured in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** — edit `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000

# Admin credentials
ADMIN_USERNAME=pushkar
ADMIN_PASSWORD=your_secure_password

# Email (optional — contact form still works without it)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=your_email@gmail.com
```

> **Note:** The app works without MongoDB. The frontend falls back to static data from `src/data/portfolio.ts`, and the contact form stores messages in-memory on the backend.

### 4. Seed the database (optional)
```bash
npm run backend:seed
```

### 5. Run both servers
```bash
npm run dev:all
```

Or separately in two terminals:
```bash
# Terminal 1 - Frontend (port 3000)
npm run dev

# Terminal 2 - Backend (port 5000)
npm run dev:backend
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Portfolio | http://localhost:3000 |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

**Admin credentials:** `pushkar` / `pushkar@12345` (change in `backend/.env`)

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## 📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/about` | About data |
| GET | `/api/education` | Education entries |
| GET | `/api/experience` | Work experience |
| GET | `/api/projects` | Projects list |
| GET | `/api/skills` | Skills |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/contact/messages` | View messages (auth) |

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api`
4. Deploy backend to Railway / Render with `backend/.env` variables

---

## 📁 Project Structure

```
developer-portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Main portfolio page
│   │   └── admin/        # Admin panel
│   ├── components/       # React components
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── ProjectsSection
│   │   ├── SkillsSection
│   │   └── three/        # Three.js 3D components
│   ├── data/
│   │   └── portfolio.ts  # Static fallback data
│   ├── hooks/
│   │   └── usePortfolioData.ts
│   └── lib/
│       └── api.ts        # Axios API client
├── backend/
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── middleware/       # Auth + error handlers
│   ├── scripts/
│   │   └── seed.js       # Database seeder
│   └── server.js         # Express entry point
└── package.json
```
