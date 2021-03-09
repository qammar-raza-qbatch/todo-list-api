const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  taskName: {
    type: String,
    minlength: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  quantity: {
    type: Number,
    minlength: 0,
    requred: true
  },
  subName: {
    type: String,
    minlength: 1,
    required: true
  }
})

module.exports = mongoose.model("Task", tasksSchema);