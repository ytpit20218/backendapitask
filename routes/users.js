const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy danh sách tất cả người dùng
router.get('/', userController.getAllUsers);

// Lấy thông tin người dùng theo ID
router.get('/:id', userController.getUser);

// Cập nhật thông tin người dùng theo ID
router.put('/:id', userController.updateUser);

// Tạo người dùng mới
router.post('/', userController.createUser);

module.exports = router;
