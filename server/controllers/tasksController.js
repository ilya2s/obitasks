const express = require("express");
const { getTasksCollection } = require("../models/taskModel");
const { ObjectId } = require("mongodb");

// Create a new task
module.exports.createTask = async (request, response) => {
    const collection = getTasksCollection();
    let { task } = request.body;

    if (!task) return response.status(400).json({ "message": "Error: No task found" });

    task = (typeof task == "string") ? task : JSON.stringify(task);    

    // Status for complete (true) / incomplete (false)
    const newTask = await collection.insertOne({ task, status: false });

    response.status(201).json({ task, status: false, _id: newTask.insertedId });
};

// Get all listed tasks
module.exports.getTasks = async (request, response) => {
    const collection = getTasksCollection();
    const tasks = await collection.find({}).toArray();

    response.status(200).json(tasks);
};

// Update task by id (mark as completed) 
module.exports.updateTask = async (request, response) => {
    const collection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    let { status } = request.body; 

    if (typeof status !== "boolean")
        return response.status(400).json({ "message": "Invalid Status" });

    const updatedTask = await collection.updateOne({ _id }, { $set: { status: !status } });
    response.status(200).json(updatedTask);
};


// Modify task by id (Modify text)
module.exports.modifyTask = async (request, response) => {
    const collection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    let {task } = request.body;

    if (!task) return response.status(400).json({ "message": "Error: No task found" });

    task = (typeof task == "string") ? task : JSON.stringify(task);

    const updatedTask = await collection.updateOne({ _id }, { $set: { task } });
    response.status(200).json(updatedTask);
};


// Delete task by id
module.exports.deleteTask = async (request, response) => {
    const collection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    
    const deletedTask = await collection.deleteOne({ _id });    
    response.status(200).json(deletedTask);
};
