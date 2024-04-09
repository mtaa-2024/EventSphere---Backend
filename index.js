const config = require("./config.json")
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./endpoints/init")

const app = express();
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

// Event endpoint
app.get("/event", db.getEvent);  // Params = (id: int), Returns = Event information + performers + comments
app.get('/event/comments', db.getUpdatedComments); // Params = (id: int), Returns = Event comments
// Updating and creating event
app.post('/create/event', db.createEvent); // Params = (user_id, title, description, location, closing_date, performers), Returns true if creation was successful
app.post('/update/event', db.updateEvent); // Params = (id: int, title, description, location, date, performers) [optional], Returns true
//app.delete('/event', db.deleteEvent); // Params = (id: int), Returns true if event was successfully deleted
// Home screen
app.get('/upcoming', db.getUpcoming); // Getting upcoming events
app.get('/attending', db.getAttending); // Getting attending events Params = (user_id: int)
app.get('/categories', db.filterByCategory); // Filter events by category
app.get('/event/search', db.searchEvent); // Search for event by string
app.get('/login',db.checkLogin)
app.get('/register',db.createNewUser)