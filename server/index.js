const express = require("express");
const app = express();
const port = 5000;

app.get("/hello", (request, response) => {
    response.status(200).json({
        "message": "hello world!"
    });
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
