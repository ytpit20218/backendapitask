// Import các thư viện cần thiết
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Đọc biến môi trường từ file .env

// Tạo ứng dụng Express
const app = express();

// Middleware
app.use(express.json()); // Xử lý JSON từ request
app.use(cors()); // Cho phép Cross-Origin Resource Sharing

// Kết nối tới MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Route cơ bản
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

// Example route: User
app.get('/users', (req, res) => {
  res.json({ message: 'Retrieve all users' });
});

// Example route: Task
app.post('/tasks', (req, res) => {
  const task = req.body;
  res.status(201).json({ message: 'Task created successfully', task });
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
