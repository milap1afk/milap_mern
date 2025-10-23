import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'MERN Task Collaboration Platform API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Socket.io connection handling
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins a project room
  socket.on('join-project', (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project ${projectId}`);
  });

  // User leaves a project room
  socket.on('leave-project', (projectId) => {
    socket.leave(projectId);
    console.log(`Socket ${socket.id} left project ${projectId}`);
  });

  // Task created event
  socket.on('task-created', (data) => {
    io.to(data.projectId).emit('task-created', data.task);
  });

  // Task updated event
  socket.on('task-updated', (data) => {
    io.to(data.projectId).emit('task-updated', data.task);
  });

  // Task deleted event
  socket.on('task-deleted', (data) => {
    io.to(data.projectId).emit('task-deleted', data.taskId);
  });

  // User typing indicator
  socket.on('typing', (data) => {
    socket.to(data.projectId).emit('user-typing', {
      username: data.username,
      taskId: data.taskId,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
