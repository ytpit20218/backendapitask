const User = require('../models/User');

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Không trả về trường password
    res.status(200).json(users); // Trả về danh sách người dùng dưới dạng JSON
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { password: 0 }); // Không trả về trường password
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Cập nhật thông tin người dùng theo ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Xóa người dùng theo ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  const { username, password, email, avatar } = req.body;
  try {
    const newUser = new User({
      username,
      password,
      email,
      avatar: avatar || null,
      createdAt: new Date(),
      lastActive: new Date(),
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};
