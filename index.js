const config = require("./config.json")
const express = require("express");
const db = require("./endpoints/template/template")
const app = express();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

app.get("/users", db.getUsers);