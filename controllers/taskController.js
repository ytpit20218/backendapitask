const Task = require('../models/Task');

// Tạo công việc mới
exports.createTask = async (req, res) => {
  const { id, title, description, status, priority, dueDate, createdBy } = req.body;

  try {
    const newTask = new Task({
      id,
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTask = await newTask.save();
    res.status(201).send(savedTask);
  } catch (error) {
    res.status(500).send({ message: 'Error creating task', error });
  }
};

// Lấy danh sách công việc
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching tasks', error });
  }
};

// Cập nhật công việc
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(500).send({ message: 'Error updating task', error });
  }
};

// Xóa công việc
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting task', error });
  }
};
