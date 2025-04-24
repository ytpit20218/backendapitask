const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  avatar: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
