const express = require("express");
const app = express();
const router = require("./routes");
const port = 5000;

app.use("/api", router);    // prefix endpoints

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
