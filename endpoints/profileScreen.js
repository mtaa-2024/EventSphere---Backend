const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { getProfileQuery, removeFriendQuery, getFriendsQuery } = require('./utils');

const getProfile = async (request, response) => {
    const id = request.query.id
    try {
        const profile = await new Promise((resolve, reject) => {
            pool.query(getProfileQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        const friends = await getFriends(id);
        await logger("Info", "Received all profile informations for user with id: " + id);
        return response.status(200).json({"result": true, "profile": profile, "friends": friends});
    } catch (error) {
        await logger("Warning", "Error while receiving profile informations user: " + error.message);
        return response.status(500).json({"result": false, "error": "Error while receiving profile informations for user with id (" + id + "):" + error.message});
    }
}

const getFriends = async (id) => {
    try {
        const friends = await new Promise((resolve, reject) => {
            pool.query(getFriendsQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return friends != null ? friends : null;
    } catch (error) {
        await logger("Warning", "Error while receiving friends for user with id (" + id + "): " + error.message);
        return null
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

module.exports = {
    getProfile,
    removeFriend
}