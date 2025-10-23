import Project from '../models/Project.js';

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const project = await Project.create({
      title,
      description,
      dueDate,
      owner: req.user._id,
      members: [req.user._id], // Owner is automatically a member
    });

    const populatedProject = await Project.findById(project._id)
      .populate('owner', 'username email avatar')
      .populate('members', 'username email avatar');

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects for user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })
      .populate('owner', 'username email avatar')
      .populate('members', 'username email avatar')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email avatar')
      .populate('members', 'username email avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is a member
    if (!project.members.some((member) => member._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const { title, description, status, dueDate } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;
    project.dueDate = dueDate || project.dueDate;

    const updatedProject = await project.save();
    const populatedProject = await Project.findById(updatedProject._id)
      .populate('owner', 'username email avatar')
      .populate('members', 'username email avatar');

    res.json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add member to project
// @route   POST /api/projects/:id/members
// @access  Private
export const addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    const { userId } = req.body;

    // Check if already a member
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    project.members.push(userId);
    await project.save();

    const populatedProject = await Project.findById(project._id)
      .populate('owner', 'username email avatar')
      .populate('members', 'username email avatar');

    res.json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
