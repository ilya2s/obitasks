require("dotenv").config();
const { connectToMongoDB } = require("./database");
const express = require("express");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 5000;

app.use("/api", router);    // prefix endpoints

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};

startServer();
