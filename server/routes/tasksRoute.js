const { createTask, getTasks, updateTask,
    modifyTask, deleteTask } = require("../controllers/tasksController");

const express = require("express");
const router = express.Router();
const endpoint = "/tasks";

// POST /tasks (CREATE)
router.post(endpoint, createTask);

// GET /tasks  (READ)
router.get(endpoint, getTasks);

// PUT /tasks/:id  (UPDATE)
router.put(`${endpoint}/:id`, updateTask);

// PATCH /tasks/:id (UPDATE text only)
router.patch(`${endpoint}/:id`, modifyTask);

// DELETE /tasks/:id  (DELETE)
router.delete(`${endpoint}/:id`, deleteTask);

module.exports = router;
