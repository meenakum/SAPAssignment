const express = require("express");
const router = express.Router();

// these are the controllers
// we will create all of them in the future
const {
  createTask,
  getTask,
  deleteTask,
  getAllTasks,
  updateTask,
  patchTask,
} = require("../router/TaskApi");

// to get all the Tasks
router.get("/AllTasks", getAllTasks);

// to get a single Task
router.get(`/Task/:id`, getTask);

// to create a Task
router.post("/createTask", createTask);

// to update the Task
router.put(`/Task/update/:id`, updateTask);

// to patch the Task
router.put(`/Task/patch/:id`, patchTask);

// to delete the Task
router.delete(`/Task/delete/:id`, deleteTask);

// we will export the router to import it in the index.js
module.exports = router;
