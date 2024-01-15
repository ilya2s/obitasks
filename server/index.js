require("dotenv").config();
const { connectToMongoDB } = require("./database");

const cookieParser = require("cookie-parser");
const express = require("express");


const taskRouter = require("./routes/tasksRoute");
const authRouter = require("./routes/authRoute");

const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());    // to be able to read json object sent to server
app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use("/api", taskRouter);
app.use("/", authRouter);

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};

startServer();
