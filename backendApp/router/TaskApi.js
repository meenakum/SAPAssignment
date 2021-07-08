const express = require('express')
const Task = require('../models/Task')

const router = express.Router()


exports.getAllTasks = (req, res) => {
  // simply use .find() method and it will return all the Tasks
  Task.find()
    .sort({ date: -1 })
    .then(all => res.json(all));
};

exports.getTask = (req, res) => {
  // to get one Task according to the id
  Task.findOne({
    $or: [{ taskval: req.params.id }]
  }).then(val => res.json(val));
};


exports.createTask = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  // create a Task instance by passing 'task' field from 'req.body'
  let task = new Task({
    taskval: req.body.taskval,
    title: req.body.title,
    completed: req.body.completed,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }
  )

  task.save((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: err,
      });
    }
    // Task is created
    // send the created Task as json response
    res.json({ task });
  });
};


exports.updateTask = (req, res) => {
  // simply change the task of the Task that user want to update by
  // the task that user has sent in req.body.task
  Task.findOneAndUpdate({ taskval: req.params.id }, {
    $set: req.body
  }).then(() => {
    res.send({ 'message': 'updated successfully' });
  });
};

exports.patchTask = (req, res) => {
  // To change specific value
  Task.findOneAndUpdate({ taskval: req.params.id }, {
    $set: { completed: true }
  }).then(() => {
    res.send({ 'message': 'updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  // Delete selected task

  Task.findOneAndRemove({
    taskval: req.params.id
  }).then((removedTask) => {
    res.json(removedTask);
  })
};
