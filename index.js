const config = require("./config.json")
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./endpoints/init")

const app = express();
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

app.get("/users", db.getUsers);
app.get('/event', db.getEvent);
app.get('/event/comments', db.getUpdatedComments)