const express = require("express");
const router = express.Router();
const endpoint = "/tasks";

// POST /tasks (CREATE)
router.post(endpoint, (request, response) => {
    response.status(201).json({
        "message": `POST REQUEST TO /api${endpoint}`
    });
});

// GET /tasks  (READ)
router.get(endpoint, (request, response) => {
    response.status(200).json({
        "message": `GET REQUEST TO /api${endpoint}`
    });
});

// PUT /tasks/:id  (UPDATE)
router.put(`${endpoint}/:id`, (request, response) => {
    response.status(200).json({
        "message": `PUT REQUEST TO /api${endpoint}/:id`
    });
});

// DELETE /tasks/:id  (DELETE)
router.delete(`${endpoint}/:id`, (request, response) => {
    response.status(200).json({
        "message": `DELETE REQUEST TO /api${endpoint}/:id`
    });
});

module.exports = router;