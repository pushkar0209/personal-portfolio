# Deployment Guide: Developer Portfolio

This application is a full-stack Next.js project with an Express/Node.js backend and MongoDB database. Below are the steps to deploy it to production.

---

## 1. Prerequisites
- A **MongoDB Atlas** account (for the database).
- A **Vercel** account (for the frontend).
- A **Render** or **Railway** account (for the backend).

---

## 2. Database Setup (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist all IP addresses (`0.0.0.0/0`) for the deployment.
3. Get your connection string (format: `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/portfolio`).

---

## 3. Backend Deployment (Render / Railway)
The backend is located in the `/backend` directory.

### Environment Variables
Configure the following in your backend hosting provider:
- `PORT`: 5000 (or the provider's default)
- `MONGO_URI`: Your MongoDB Atlas string.
- `JWT_SECRET`: A long, random string.
- `ADMIN_USERNAME`: Your desired admin username.
- `ADMIN_PASSWORD`: Your desired admin password.
- `CLIENT_URL`: The URL of your deployed frontend (e.g., `https://your-portfolio.vercel.app`).
- `SMTP_USER` & `SMTP_PASS`: (Optional) For email notifications.

### Build Commands
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

---

## 4. Frontend Deployment (Vercel)
Vercel is the best choice for Next.js.

### Environment Variables
Configure the following in Vercel:
- `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://your-api.onrender.com/api`).

### Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./` (current directory)
- **Install Command**: `npm install`
- **Build Command**: `npm run build`

---

## 5. Post-Deployment Steps
Once both are deployed:
1. **Seed the Database**: 
   You can seed your production database by running the seed script locally but pointing to the production MongoDB URI:
   ```bash
   # In backend/.env, set production MONGO_URI
   npm run seed
   ```
2. **Verify Admin**: Login to `https://your-portfolio.vercel.app/admin/login` using your configured credentials.

---

## Docker Deployment (Optional)
If you prefer Docker, you can use the provided `docker-compose.yml`:
```bash
docker-compose up --build
```

---

## Security Checklist
- [ ] Change `JWT_SECRET` to a unique production value.
- [ ] Ensure `MONGO_URI` is not committed to version control.
- [ ] Verify `CLIENT_URL` in backend matches your frontend domain to allow CORS.
