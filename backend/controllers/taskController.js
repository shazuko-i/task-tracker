const Task = require('../models/taskModel');

// Controller to get tasks list
exports.getTasks = async (req, res) => {
  // console.log('BODY:', req.body);
  try {
    const tasks = await Task.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('GET error:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks.' });
  }
};

// Controller to create a new task
exports.createTask = async (req, res) => {
  // console.log('BODY:', req.body);
  try {
    const { name, description, status } = req.body;

    if (!name || !description || !status) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const task = await Task.createTask({ name, description, status });
    res.status(201).json(task);
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Controller to create a new task
exports.updateTask = async (req, res) => {
  // console.log('BODY:', req.body);
  try {
    const id = parseInt(req.params.id);
    const { name, description, status } = req.body;

    const updated = await Task.updateTask(id, {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('PUT error:', error);
    res.status(500).json({ error: 'Failed to update task.' });
  }
};

// Controller to delete the task
exports.deleteTask = async (req, res) => {
  // console.log('BODY:', req.body);
  try {
    const id = parseInt(req.params.id);
    await Task.deleteTask(id);
    res.status(200).json({ message: 'Task deleted.' });
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
};
