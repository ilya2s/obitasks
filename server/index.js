const express = require("express");

const app = express();

app.get("/hello", (request, response) => {
    response.status(200).json({
        "message": "hello world!"
    });
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
