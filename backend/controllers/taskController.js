import Task from '../models/Task.js';
import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;

    // Check if project exists and user is a member
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!projectDoc.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to create tasks in this project' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user._id,
      priority,
      dueDate,
    });

    const populatedTask = await Task.findById(task._id)
      .populate('project', 'title')
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email avatar');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks for a project
// @route   GET /api/tasks/project/:projectId
// @access  Private
export const getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email avatar')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'title members')
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email avatar');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is a member of the project
    if (!task.project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project', 'members');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is a member of the project
    if (!task.project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedTo = assignedTo || task.assignedTo;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();
    const populatedTask = await Task.findById(updatedTask._id)
      .populate('project', 'title')
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email avatar');

    res.json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project', 'members owner');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is creator or project owner
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      task.project.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload task attachment
// @route   POST /api/tasks/:id/attachments
// @access  Private
export const uploadAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project', 'members');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!task.project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'task-attachments' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    task.attachments.push({
      url: result.secure_url,
      publicId: result.public_id,
    });

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
