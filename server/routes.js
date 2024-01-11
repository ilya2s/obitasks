const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");
const {ObjectId } = require("mongodb");
const endpoint = "/tasks";

// POST /tasks (CREATE)
router.post(endpoint, async (request, response) => {
    const collection = getCollection();
    let { task } = request.body;

    if (!task) return response.status(400).json({ "message": "Error: No task found" });

    task = (typeof task == "string") ? task : JSON.stringify(task);    

    // Status for complete (true) / incomplete (false)
    const newTask = await collection.insertOne({ task, status: false });

    response.status(201).json({ task, status: false, _id: newTask.insertedId });
});

// GET /tasks  (READ)
router.get(endpoint, async (request, response) => {
    const collection = getCollection();
    const tasks = await collection.find({}).toArray();

    response.status(200).json(tasks);
});

// PUT /tasks/:id  (UPDATE)
router.put(`${endpoint}/:id`, async (request, response) => {
    const collection = getCollection();
    const _id = new ObjectId(request.params.id);
    let { status } = request.body; 

    if (typeof status !== "boolean")
        return response.status(400).json({ "message": "Invalid Status" });

    const updatedTask = await collection.updateOne({ _id }, { $set: { status: !status } });
    response.status(200).json(updatedTask);
});

// DELETE /tasks/:id  (DELETE)
router.delete(`${endpoint}/:id`, async (request, response) => {
    const collection = getCollection();
    const _id = new ObjectId(request.params.id);
    
    const deletedTask = await collection.deleteOne({ _id });    
    response.status(200).json(deletedTask);
});

module.exports = router;