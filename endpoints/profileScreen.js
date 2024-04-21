const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { removeFriendQuery, getFriendsQuery, addFriendQuery, isFriendQuery} = require('./utils');

const getFriends = async (request, response) => {
    const id = request.query.id;
    try {
        const friends = await new Promise((resolve, reject) => {
            pool.query(getFriendsQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        await logger("Info", "Received all friends for user with id: " + id);
        return response.status(200).json({"result": true, "friends": friends});
    } catch (error) {
        await logger("Warning", "Error while receiving friends for user with id (" + id + "): " + error.message);
        return response.status(500).json({"result": false, "error": "Error while receiving friends for user with id (" + id + "): " + error.message});
    }
}

const removeFriend = async (request, response) => {
    const { id, friendId } = request.query;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(removeFriendQuery, [id, friendId], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return response.status(200).json({"result": true, "removed_id": friendId});
    } catch (error) {
        await logger("Warning", "Error while removing friend with id (" + friendId + "): " + error.message);
        return response.status(500).json({"result": false, "error": "\"Error while removing friend with id (" + friendId + "):" + error.message});
    }
}

const addFriend = async(request, response)=> {
    const { user_id, friend_id } = request.body;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(addFriendQuery, [user_id, friend_id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return response.status(200).json({"result": true, "add_id": friend_id});
    } catch (error) {
        await logger("Warning", "Error while adding friend with id (" + friend_id + "): " + error.message);
        return response.status(500).json({"result": false, "error": "\"Error while adding friend with id (" + friend_id + "):" + error.message});
    }
}

const isFriend = async (request, response) => {
    const { user_id, friend_id } = request.query;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(isFriendQuery, [user_id, friend_id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return response.status(200).json({"result": result.length > 0});
    } catch (error) {
        await logger("Warning", "Error while getting info friend with id (" + friend_id + "): " + error.message);
        return response.status(500).json({"result": false, "error": "\"Error while adding friend with id (" + friend_id + "):" + error.message});
    }
}


module.exports = {
    getFriends,
    removeFriend,
    addFriend,
    isFriend
}