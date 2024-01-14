const { getConnectedClient } = require("../database");

// To always have acces to our tasks collection (table)
const getTasksCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("tasksdb").collection("tasks");
    return collection;
};

module.exports = { getTasksCollection };
