const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { getUpcomingEventsQuery, getExpiredEventsQuery, createEventQuery} = require('./utils');

const getUpcomingOwner = async (request, response) => {
    const id = request.query.id;
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(getUpcomingEventsQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        await logger( "Info", "Successfully get upcoming events for user (" + id + ")");
        return response.status(200).json({"result": true, "events": events});
    } catch (error) {
        await logger( "Warning", "Error getting upcoming events for user (" + id + "): " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
    }
}

const getExpiredOwner = async (request, response) => {
    const id = request.query.id;
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(getExpiredEventsQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        await logger( "Info", "Successfully get expired events for user (" + id + ")");
        return response.status(200).json({"result": true, "events": events});
    } catch (error) {
        await logger( "Warning", "Error getting expired events for user (" + id + "): " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
    }
}

module.exports = {
    getUpcomingOwner,
    getExpiredOwner,
}