const { getConnectedClient } = require("../database")

// To always have access to our users collection (table)
const getUsersCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("tasksdb").collection("users");
    
    return collection;
};

module.exports = { getUsersCollection };
