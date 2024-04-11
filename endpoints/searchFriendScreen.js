const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { getFriendSearchQuery } = require('./utils');

const getFriendSearch = async (request, response) => {
    const filter = request.query.filter
    try {
        const friends = await new Promise((resolve, reject) => {
            pool.query(getFriendSearchQuery, [filter], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        if (friends.length > 0) {
            await logger("Info", "Received all friends with filter: " + filter);
            return response.status(200).json({"result": true, "friends": friends});
        }
        await logger("Error", "No friends found with filter: " + filter);
        return response.status(404).json({"result": false, "friends": "No friends found with filter: " + filter});
    } catch (error) {
        await logger("Warning", "Error while searching for friends: " + error.message);
        return response.status(500).json({ "result": false, "error": "Error while searching for friends: " + error.message });
    }
}

module.exports = {
    getFriendSearch
}