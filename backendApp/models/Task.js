const mongoose = require('mongoose')

const Task = new mongoose.Schema({
  taskval: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  completed: {
    type: Boolean,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('Task', Task)