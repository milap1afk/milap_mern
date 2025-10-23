# 🚀 MERN Task Collaboration Platform

A full-stack real-time task management and collaboration platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring WebSocket-based real-time updates, JWT authentication, and cloud file storage.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Key Concepts Demonstrated](#key-concepts-demonstrated)
- [Screenshots](#screenshots)

## ✨ Features

### Core Features
- **User Authentication & Authorization**: Secure JWT-based authentication with password hashing
- **Project Management**: Create, read, update, and delete projects with role-based access
- **Task Management**: Full CRUD operations for tasks with status tracking (To-Do, In Progress, Completed)
- **Real-Time Updates**: Socket.io integration for instant task updates across all connected users
- **File Uploads**: Cloudinary integration for profile pictures and task attachments
- **Priority System**: High, Medium, Low priority levels for tasks
- **Due Date Tracking**: Set and track due dates for projects and tasks
- **Kanban Board**: Visual task board with drag-and-drop-like status updates
- **Collaborative Workspace**: Multiple users can collaborate on projects in real-time

### Technical Features
- **MVC Architecture**: Clean separation of concerns with Models, Views, and Controllers
- **RESTful API**: Well-structured API endpoints following REST principles
- **Real-Time Communication**: WebSocket implementation for live updates
- **Responsive Design**: Mobile-friendly UI that works on all screen sizes
- **Error Handling**: Comprehensive error handling and validation
- **Protected Routes**: Client-side route protection for authenticated users

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling) library
- **Socket.io** - Real-time bidirectional communication
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud-based image and file storage
- **Multer** - File upload middleware
- **Express Validator** - Request validation
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Socket.io Client** - Real-time client library
- **React Toastify** - Toast notifications
- **date-fns** - Date formatting and manipulation
- **Context API** - State management

## 📁 Project Structure

```
mern-task-collaboration-platform/
│
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary configuration
│   │
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── projectController.js  # Project CRUD operations
│   │   └── taskController.js     # Task CRUD operations
│   │
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication middleware
│   │   ├── errorHandler.js       # Error handling middleware
│   │   └── upload.js             # File upload middleware
│   │
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Project.js            # Project schema
│   │   └── Task.js               # Task schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── projectRoutes.js      # Project routes
│   │   └── taskRoutes.js         # Task routes
│   │
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point with Socket.io setup
│
└── frontend/
    ├── public/
    │   └── index.html
    │
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js         # Navigation component
    │   │
    │   ├── context/
    │   │   ├── AuthContext.js    # Authentication context
    │   │   └── SocketContext.js  # Socket.io context
    │   │
    │   ├── pages/
    │   │   ├── Login.js          # Login page
    │   │   ├── Register.js       # Registration page
    │   │   ├── Dashboard.js      # Projects dashboard
    │   │   └── ProjectDetail.js  # Task board page
    │   │
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   │
    │   ├── App.js                # Main app component
    │   ├── index.js              # React entry point
    │   └── index.css             # Global styles
    │
    ├── .gitignore
    └── package.json
```

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** - Comes with Node.js
- **Cloudinary Account** - [Sign up free](https://cloudinary.com/users/register/free)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-task-collaboration-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Environment Variables](#environment-variables) section).

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**
- Install and start MongoDB locally
- MongoDB will run on `mongodb://localhost:27017` by default

**Option B: MongoDB Atlas (Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your backend `.env` file

## 🔐 Environment Variables

### Backend (.env)

Create a `backend/.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mern-task-collab
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-task-collab?retryWrites=true&w=majority

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local) - Optional

Create a `frontend/.env.local` file if you need to customize API URLs:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## ▶️ Running the Application

### Development Mode

**Option 1: Run Backend and Frontend Separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

**Option 2: Production Mode**

Build and run the frontend:
```bash
cd frontend
npm run build
```

Serve the built frontend with the backend (optional setup required).

### First Time Setup

1. Open your browser to `http://localhost:3000`
2. Click "Register" to create a new account
3. Log in with your credentials
4. Create your first project
5. Add tasks to your project
6. Open the app in another browser/tab to see real-time updates!

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Project Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects` | Create new project | Yes |
| GET | `/api/projects` | Get all user projects | Yes |
| GET | `/api/projects/:id` | Get single project | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Yes |
| POST | `/api/projects/:id/members` | Add member to project | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tasks` | Create new task | Yes |
| GET | `/api/tasks/project/:projectId` | Get all tasks in project | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| POST | `/api/tasks/:id/attachments` | Upload attachment | Yes |

### Example API Request

```javascript
// Login Request
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "_id": "...",
  "username": "johndoe",
  "email": "user@example.com",
  "avatar": "https://...",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `join-project` | Client → Server | User joins a project room |
| `leave-project` | Client → Server | User leaves a project room |
| `task-created` | Both | New task created notification |
| `task-updated` | Both | Task updated notification |
| `task-deleted` | Both | Task deleted notification |

## 🌐 Deployment

### Backend Deployment (Render, Heroku, Railway, etc.)

1. **Prepare for deployment:**
   - Ensure all environment variables are set on your hosting platform
   - Make sure `NODE_ENV` is set to `production`

2. **Example: Deploy to Render**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add all environment variables from your `.env` file

### Frontend Deployment (Vercel, Netlify, etc.)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Example: Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel` in the frontend directory
   - Set environment variables in Vercel dashboard
   - Update `REACT_APP_API_URL` to your backend URL

3. **Example: Deploy to Netlify**
   - Connect your GitHub repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
   - Add environment variables in Netlify settings

### MongoDB Atlas Setup for Production

1. Create a production cluster on MongoDB Atlas
2. Whitelist all IP addresses (0.0.0.0/0) or specific IPs
3. Create a database user
4. Update `MONGODB_URI` in your backend environment variables

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard
3. Add to environment variables

## 🎓 Key Concepts Demonstrated

This project demonstrates the following MERN stack concepts from your curriculum:

### MERN-1: Node.js & Backend Development
✅ Server-driven architecture
✅ HTTP module and Express server setup
✅ Modular code structure

### MERN-2: Express.js
✅ Routing and middleware
✅ Request/response handling
✅ Error handling middleware

### MERN-3: MongoDB & CRUD Operations
✅ MongoDB connection using Mongoose
✅ Complete CRUD operations
✅ Database validation and relationships

### MERN-4: MVC Architecture
✅ Models (User, Project, Task)
✅ Controllers (business logic separation)
✅ Views (React frontend)
✅ Clean code structure

### MERN-5-7: Full-Stack Project Setup
✅ Backend and frontend integration
✅ Database connection and models
✅ Authentication and authorization with JWT

### MERN-8: Custom Middlewares & Cloudinary
✅ Custom authentication middleware
✅ File upload middleware with Multer
✅ Cloudinary integration for image uploads

### MERN-9-10: API Development
✅ RESTful API design
✅ Protected routes
✅ User profiles and relationships

### MERN-11: Real-Time Features (Socket.io)
✅ WebSocket integration
✅ Real-time task updates
✅ Live collaboration features
✅ User presence notifications

### MERN-12-13: Frontend Development
✅ React components and hooks
✅ React Router for navigation
✅ Context API for state management
✅ Axios for API calls

### MERN-14: Performance & Best Practices
✅ Code organization
✅ Error handling
✅ Security best practices
✅ Responsive design

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware for route protection
- **Input Validation**: Server-side validation
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data protection

## 📱 Features Demo

1. **User Registration & Login**: Secure authentication flow
2. **Dashboard**: View all your projects at a glance
3. **Project Management**: Create, update, and organize projects
4. **Kanban Board**: Visual task management with status columns
5. **Real-Time Updates**: See changes instantly without refreshing
6. **Profile Management**: Update user information and avatar
7. **Task Priority**: Color-coded priority system
8. **Due Dates**: Track deadlines for projects and tasks

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Make sure MongoDB is running locally or check your Atlas connection string

**CORS Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```
- Verify `CLIENT_URL` in backend `.env` matches your frontend URL

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change the PORT in `.env` or kill the process using that port

**Socket.io Not Connecting:**
- Check that both frontend and backend URLs are correct
- Verify CORS settings in server.js

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as an end-term project demonstrating MERN stack proficiency.

---

**🎉 Happy Coding!** If you found this project helpful, please give it a star ⭐
