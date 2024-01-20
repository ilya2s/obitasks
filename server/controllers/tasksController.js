const { getTasksCollection } = require("../models/taskModel");
const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("../models/userModel");

// Create a new task
module.exports.createTask = async (request, response) => {
    const tasksCollection = getTasksCollection();

    let { task, userId } = request.body;

    if (!task) return response.status(400).json({
        "message": "Error: No task found"
    });

    if (!userId) return response.status(400).json({
        "message": "Error: No user found"
    });

    task = (typeof task == "string") ? task : JSON.stringify(task);    

    // Status for complete (true) / incomplete (false)
    const newTask = await tasksCollection.insertOne({ task, status: false, user: userId });

    response.status(201).json({
        task,
        status: false,
        _id: newTask.insertedId,
        user: userId
    });
};

// Get all listed tasks
module.exports.getTasks = async (request, response) => {
    const tasksCollection = getTasksCollection();

    let { user } = request.query;

    const tasks = await tasksCollection.find({ user }).toArray();

    response.status(200).json(tasks);
};

// Update task by id (mark as completed) 
module.exports.updateTask = async (request, response) => {
    const tasksCollection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    let { status } = request.body; 

    if (typeof status !== "boolean")
        return response.status(400).json({ "message": "Invalid Status" });

    const updatedTask = await tasksCollection.updateOne({ _id }, { $set: { status: !status } });
    response.status(200).json(updatedTask);
};


// Modify task by id (Modify text)
module.exports.modifyTask = async (request, response) => {
    const tasksCollection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    let {task } = request.body;

    if (!task) return response.status(400).json({ "message": "Error: No task found" });

    task = (typeof task == "string") ? task : JSON.stringify(task);

    const updatedTask = await tasksCollection.updateOne({ _id }, { $set: { task } });
    response.status(200).json(updatedTask);
};


// Delete task by id
module.exports.deleteTask = async (request, response) => {
    const tasksCollection = getTasksCollection();
    const _id = new ObjectId(request.params.id);
    
    const deletedTask = await tasksCollection.deleteOne({ _id });    
    response.status(200).json(deletedTask);
};
