# 🚀 Setting Up Your Project on Localhost

## Current Status
Your project is ready to run, but needs a MongoDB database connection.

## 🎯 Quick Setup Options

### Option 1: MongoDB Atlas (Recommended - 5 minutes) ✅

**This is the fastest way - no local installation needed!**

#### Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (it's free!)
3. Choose "Free" tier (M0 Sandbox)
4. Select a cloud provider (AWS is fine)
5. Choose a region close to you
6. Click "Create Cluster" (takes 1-3 minutes)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Click "Add a connection IP address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Add IP Address"
3. Create a database user:
   - Username: `mernuser`
   - Password: `mernpass123` (or your own)
   - Click "Create Database User"
4. Click "Choose a connection method"
5. Click "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://mernuser:<password>@cluster0.xxxxx.mongodb.net/...`)

#### Step 3: Update Your .env File
Open `backend/.env` and replace the MONGODB_URI line:

```env
MONGODB_URI=mongodb+srv://mernuser:mernpass123@cluster0.xxxxx.mongodb.net/mern-task-collab?retryWrites=true&w=majority
```

Replace:
- `mernuser` with your username
- `mernpass123` with your password
- `cluster0.xxxxx` with your cluster address

#### Step 4: Run the Project!
Now open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd ~/mern-task-collaboration-platform/backend
npm run dev
```

Wait for: `✓ MongoDB Connected: ...`

**Terminal 2 - Frontend:**
```bash
cd ~/mern-task-collaboration-platform/frontend
npm start
```

Browser opens at: http://localhost:3000 🎉

---

### Option 2: Install MongoDB Locally (15 minutes)

If you prefer local MongoDB:

#### For macOS (using Homebrew):
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify it's running
brew services list
```

#### Update .env file:
```env
MONGODB_URI=mongodb://localhost:27017/mern-task-collab
```

#### Run the project:
**Terminal 1 - Backend:**
```bash
cd ~/mern-task-collaboration-platform/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ~/mern-task-collaboration-platform/frontend
npm start
```

---

## 🧪 Testing the Application

Once both servers are running:

### 1. Register a New User
- Browser opens at http://localhost:3000
- Click "Register" in the navbar
- Fill in:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`
- Click "Register"
- You'll be automatically logged in and redirected to Dashboard

### 2. Create Your First Project
- Click "Create Project" button
- Fill in:
  - Title: `My First Project`
  - Description: `Testing the MERN app`
  - Due Date: Pick any future date (optional)
- Click "Create"
- Your project card appears on the dashboard

### 3. Add Tasks to Your Project
- Click on your project card
- You'll see a Kanban board with 3 columns:
  - To-Do
  - In Progress
  - Completed
- Click "Create Task"
- Fill in:
  - Title: `Complete README`
  - Description: `Write project documentation`
  - Priority: `High`
  - Due Date: Optional
- Click "Create"
- Your task appears in the To-Do column!

### 4. Test Task Management
- Click "Start" on your task → Moves to "In Progress"
- Click "Complete" → Moves to "Completed"
- Click "Delete" → Removes the task

### 5. Test Real-Time Updates 🔥
- Open http://localhost:3000 in TWO different browser windows/tabs
- Log in to the same account in both
- Go to the same project in both windows
- Create/update a task in one window
- **Watch it instantly appear/update in the other window!**
- This is Socket.io real-time magic! ✨

---

## 🎥 What You Should See

### Backend Terminal:
```
Server running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

### Frontend Terminal:
```
webpack compiled successfully
Compiled successfully!

You can now view mern-task-collaboration-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Browser at http://localhost:3000:
- Beautiful UI with navbar
- Login/Register pages
- Dashboard with project cards
- Kanban board for tasks
- Real-time updates!

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB Atlas is set up correctly or MongoDB is running locally

Check Atlas connection:
```bash
# Test if you can reach Atlas
ping cluster0.xxxxx.mongodb.net
```

### "Port 3000 already in use"
**Solution**: Another app is using port 3000
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>
```

### "Port 5000 already in use"
**Solution**: Another app is using port 5000
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>
```

### "Module not found" errors
**Solution**: Dependencies not installed
```bash
# Backend
cd ~/mern-task-collaboration-platform/backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ~/mern-task-collaboration-platform/frontend
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Checklist Before Running

- [ ] MongoDB Atlas account created OR MongoDB installed locally
- [ ] `backend/.env` file has correct MONGODB_URI
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Two terminal windows ready
- [ ] Ports 3000 and 5000 are free

---

## 🎯 Pro Tips

1. **Keep both terminals open** - You need both backend and frontend running simultaneously

2. **Check backend first** - Always make sure backend says "MongoDB Connected" before testing frontend

3. **Use Chrome DevTools** - Press F12 to see console logs and network requests

4. **Test real-time features** - The Socket.io real-time updates are the coolest feature!

5. **Create multiple projects and tasks** - This showcases the full functionality

---

## 📱 Features to Demonstrate

✅ User registration and login (JWT authentication)
✅ Project creation with CRUD operations
✅ Task management with status updates
✅ Priority system (High, Medium, Low)
✅ Due date tracking
✅ Kanban board visualization
✅ **Real-time updates across multiple tabs** 🔥
✅ Responsive design (try resizing your browser!)

---

## 🚀 Next Steps After Setup

Once it's running:
1. Take screenshots of the working app
2. Test all features thoroughly
3. Open multiple browser tabs to demo real-time updates
4. Deploy to Vercel (frontend) and Render (backend) when ready

---

**Need help?** Check the main README.md for more detailed documentation!

**Ready to code?** The project structure is clean and easy to extend with new features!
