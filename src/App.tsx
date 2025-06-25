import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from './types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const API_URL = 'http://localhost:3001/api/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskname, setTaskname] = useState('');
  const [taskdesc, setTaskdesc] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const [filter, setFilter] = useState<'All' | 'Incomplete' | 'Complete'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Fetch tasks from API when app loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const calculateSummary = (taskList: Task[]) => {
    const completed = taskList.filter(task => task.status === 'Complete').length;
    const incomplete = taskList.length - completed;

    setTasks(taskList);
    setTotalCount(taskList.length);
    setCompleteCount(completed);
    setIncompleteCount(incomplete);
  };

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      calculateSummary(res.data);
      setError('');
    } catch {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const addTask = async () => {
    if (!taskname || !taskdesc) {
      setError('Task name and description are required.');
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        name: taskname,
        description: taskdesc,
        status: 'Incomplete',
      });
      calculateSummary([...tasks, res.data]);
      setTaskname('');
      setTaskdesc('');
      setError('');
    } catch {
      setError('Failed to add task.');
    }
  };

  // Update a task status
  const updateTaskStatus = async (id: number, currentStatus: string | null) => {
    const newStatus = currentStatus === 'Complete' ? 'Incomplete' : 'Complete';
    
    // Send POST request to backend
    try {
      const res = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      const updatedTasks = tasks.map(task => task.id === id ? res.data : task);
      // Update state with new task
      calculateSummary(updatedTasks);
    } catch {
      setError('Failed to update task status.');
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      const filtered = tasks.filter(task => task.id !== id);
      calculateSummary(filtered);
    } catch {
      setError('Failed to delete task.');
    }
  };

  // Edit a task
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTaskname(task.name ?? '');
    setTaskdesc(task.description ?? '');
  };

  // Save the edited task
  const saveEdit = async () => {
    if (!taskname || !taskdesc || editingId === null) {
      setError('Both fields are required to save changes.');
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/${editingId}`, {
        name: taskname,
        description: taskdesc,
      });
      const updatedTasks = tasks.map(task => task.id === editingId ? res.data : task);
      calculateSummary(updatedTasks);
      setEditingId(null);
      setTaskname('');
      setTaskdesc('');
      setError('');
    } catch {
      setError('Failed to edit task.');
    }
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="summary-card">
        <div className="summary-box">
          <h3>Total Tasks</h3>
          <p>{totalCount}</p>
        </div>
        <div className="summary-box">
          <h3>Completed</h3>
          <p className="green">{completeCount}</p>
        </div>
        <div className="summary-box">
          <h3>In Progress</h3>
          <p className="yellow">{incompleteCount}</p>
        </div>
      </div>

      <div className="form">
        <input type="text" placeholder="Task Name" value={taskname} onChange={e => setTaskname(e.target.value)} />
        <input type="text" placeholder="Description" value={taskdesc} onChange={e => setTaskdesc(e.target.value)} />
        <button onClick={editingId ? saveEdit : addTask}>{editingId ? 'Save Edit' : 'Add Task'}</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="filter-sort-row">
        <div className="filter-tabs">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
          <button className={filter === 'Incomplete' ? 'active' : ''} onClick={() => setFilter('Incomplete')}>In Progress</button>
          <button className={filter === 'Complete' ? 'active' : ''} onClick={() => setFilter('Complete')}>Completed</button>
        </div>
        <div className="sort-toggle" onClick={() => setSortOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'))}>
          <i className={`bi ${sortOrder === 'newest' ? 'bi-arrow-down' : 'bi-arrow-up'}`} title={`Sort by ${sortOrder}`} />
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add one to get started!</p>
      ) : (
        <ul className="task-list">
          {[...tasks]
            .filter(task => {
              if (filter === 'All') return true;
              return filter === 'Complete' ? task.status === 'Complete' : task.status !== 'Complete';
            })
            .sort((a, b) => {
              if (a.status === 'Complete' && b.status !== 'Complete') return 1;
              if (a.status !== 'Complete' && b.status === 'Complete') return -1;
              return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
            })
            .map(task => (
              <li key={task.id} className={task.status === 'Complete' ? 'completed' : ''}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.status === 'Complete'}
                    onChange={() => updateTaskStatus(task.id, task.status)}
                  />
                  <span>
                    <strong>{task.name}</strong>: {task.description}
                    <span className={`status-badge ${task.status === 'Complete' ? 'status-complete' : 'status-incomplete'}`}>
                      {task.status === 'Complete' ? '✅ Completed' : '⏳ In Progress'}
                    </span>
                  </span>
                </div>
                <div className="actions">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
