import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProject, getTasksByProject, createTask, updateTask, deleteTask } from '../services/api';
import { SocketContext } from '../context/SocketContext';
import { format } from 'date-fns';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const socket = useContext(SocketContext);

  const fetchProjectAndTasks = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([getProject(id), getTasksByProject(id)]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      toast.error('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectAndTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (socket && project) {
      socket.emit('join-project', project._id);

      socket.on('task-created', (task) => {
        setTasks((prev) => [...prev, task]);
        toast.info('New task added!');
      });

      socket.on('task-updated', (updatedTask) => {
        setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
        toast.info('Task updated!');
      });

      socket.on('task-deleted', (taskId) => {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        toast.info('Task deleted!');
      });

      return () => {
        socket.emit('leave-project', project._id);
        socket.off('task-created');
        socket.off('task-updated');
        socket.off('task-deleted');
      };
    }
  }, [socket, project]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask({ ...formData, project: id });
      setTasks((prev) => [...prev, data]);
      if (socket) {
        socket.emit('task-created', { projectId: id, task: data });
      }
      toast.success('Task created!');
      setShowModal(false);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const { data } = await updateTask(taskId, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === taskId ? data : t)));
      if (socket) {
        socket.emit('task-updated', { projectId: id, task: data });
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        if (socket) {
          socket.emit('task-deleted', { projectId: id, taskId });
        }
        toast.success('Task deleted!');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const groupTasksByStatus = () => {
    return {
      todo: tasks.filter((t) => t.status === 'todo'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      completed: tasks.filter((t) => t.status === 'completed'),
    };
  };

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (!project) {
    return <div className="container">Project not found</div>;
  }

  const groupedTasks = groupTasksByStatus();

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h2>{project.title}</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>{project.description}</p>
        <div style={{ marginTop: '1rem' }}>
          <span className={`project-status ${project.status}`}>{project.status}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ width: 'auto', marginBottom: '2rem' }}>
        Create Task
      </button>

      <div className="task-columns">
        {['todo', 'in-progress', 'completed'].map((status) => (
          <div key={status} className={`task-column ${status}`}>
            <h3>{status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}</h3>
            {groupedTasks[status].map((task) => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                {task.description && <p>{task.description}</p>}
                <div style={{ marginTop: '0.5rem' }}>
                  <span className={`task-priority ${task.priority}`}>{task.priority}</span>
                </div>
                {task.dueDate && (
                  <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                    Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {status !== 'completed' && (
                    <button
                      className="btn btn-success"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: 'auto' }}
                      onClick={() =>
                        handleUpdateTaskStatus(task._id, status === 'todo' ? 'in-progress' : 'completed')
                      }
                    >
                      {status === 'todo' ? 'Start' : 'Complete'}
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: 'auto' }}
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date (Optional)</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
