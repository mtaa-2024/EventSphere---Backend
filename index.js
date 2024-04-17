const config = require("./config.json")
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./endpoints/init")
const {insertProfileImage} = require("./endpoints/editProfileScreen");

const app = express();
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

// Event endpoint
app.get("/event", db.getEvent);
app.get('/event/comments', db.getUpdatedComments);

app.post('/create/event', db.createEvent);
app.post('/update/event', db.updateEvent);

app.get('/upcoming', db.getUpcoming);
app.get('/attending', db.getAttending);
app.get('/categories', db.filterByCategory);
app.get('/event/search', db.searchEvent);

app.get('/login',db.getLoginData);
app.post('/register',db.createNewUser)
app.post('/user/edit', db.editUserProfile)

app.get('/friends/search', db.getFriendSearch)
app.get('/friends', db.getFriends)
app.delete('/friend', db.removeFriend)
app.post('/friend/add', db.addFriend)

app.get('/upcoming/owner', db.getUpcomingOwner)
app.get('/expired/owner', db.getExpiredOwner)

app.put('/profile/image', db.insertProfileImage)
app.get('/user', db.getUpdatedUser)

app.post('/comment', db.insertComment)