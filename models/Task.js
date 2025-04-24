const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To do', 'In progress', 'Done', 'Cancelled'], required: true },
  priority: { type: Number, enum: [1, 2, 3], default: 2 },
  dueDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: { type: [String], default: [] },
});

module.exports = mongoose.model('Task', TaskSchema);
