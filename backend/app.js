const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config(); // Load .env

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Mount all task routes under /api
app.use('/api', taskRoutes);

module.exports = app;
