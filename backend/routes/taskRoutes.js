const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route: GET /api/tasks = Get all tasks
router.get('/tasks', taskController.getTasks);

// Route: POST /api/tasks = Create a new task
router.post('/tasks', taskController.createTask);

// Route: PUT /api/tasks/:id = Update a task
router.put('/tasks/:id', taskController.updateTask);

// Route: DELETE /api/tasks/:id = Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
