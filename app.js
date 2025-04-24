const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Tạo app
const app = express();

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});
