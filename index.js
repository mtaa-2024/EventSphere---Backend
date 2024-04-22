const config = require("./config.json")
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./endpoints/init")
const {insertProfileImage} = require("./endpoints/editProfileScreen");
const WebSocket = require('ws');

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
app.get('/event/search', db.searchEvent);

app.get('/login',db.getLoginData);
app.post('/register',db.createNewUser)
app.post('/user/edit', db.editUserProfile)

app.get('/friends/search', db.getFriendSearch)
app.get('/friends', db.getFriends)
app.delete('/friend', db.removeFriend)
app.post('/friend/add', db.addFriend)
app.get('/isFriend', db.isFriend)

app.get('/upcoming/owner', db.getUpcomingOwner)
app.get('/expired/owner', db.getExpiredOwner)

app.put('/profile/image', db.insertProfileImage)
app.get('/user', db.getUpdatedUser)

app.post('/comment', db.insertComment)

app.get('/username', db.checkUsernameExists)
app.get('/email', db.checkEmailExists)


const wss = new WebSocket.Server({ port: config["wss:port"] });

const clients = new Map();

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        wss.clients.forEach((client) => {
            client.send(message)
        })
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
        clients.forEach((clientSocket, clientId) => {
            if (clientSocket === ws) {
                clients.delete(clientId);
            }
        });
    });

});
