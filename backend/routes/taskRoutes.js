import express from 'express';
import {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask,
  uploadAttachment,
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/project/:projectId', protect, getTasksByProject);
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);
router.post('/:id/attachments', protect, upload.single('attachment'), uploadAttachment);

export default router;
