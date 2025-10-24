# 🚀 Deployment Guide

## Quick Deployment Steps

### 1. Backend Deployment (Render.com)
1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your repository: `milap1afk/milap_mern`
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-task-collab
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

### 2. Frontend Deployment (Vercel.com)
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import `milap1afk/milap_mern`
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
4. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com
   ```

### 3. Database Setup (MongoDB Atlas)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Use in Render environment variables

## Final URLs
- **Frontend**: https://your-project.vercel.app
- **Backend**: https://your-project.onrender.com
- **GitHub**: https://github.com/milap1afk/milap_mern
