const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { getUpcomingQuery, getAttendingQuery, filterByCategoryQuery, searchEventQuery } = require('./utils')

const getUpcoming = async (request, response) => {
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(getUpcomingQuery, null, (error, results) => {
                error ? reject(error) : resolve(results.rows);
            })
        })
        if (events.length > 0) {
            await logger("Info", "Received all upcoming events");
            return response.status(200).json({"result": true, "events": events});
        }
        return response.status(404).json({"result": false, "error": "No upcoming events"});
    } catch (error) {
        await logger("Warning", "Error getting upcoming events: " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
    }
}

const getAttending = async (request, response) => {
    const id = request.query.id;
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(getAttendingQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            })
        })
        if (events.length > 0) {
            await logger("Info", "Received all attending events for user with id: " + id)
            return response.status(200).json({"result": true, "events": events});
        }
        return response.status(404).json({"result": false, "error": "No attending events"});
    } catch (error) {
        await logger("Warning", "Error getting attending events for user with id: (" + id + ") " + error.message)
        return response.status(500).json({"result": false, "error": error.message})
    }
}

const filterByCategory = async (request, response) => {
    const category_id = request.query.id;
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(filterByCategoryQuery, [category_id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            })
        })
        if (events.length > 0) {
            await logger("Info", "Received all events with category id: " + category_id)
            return response.status(200).json({"result": true, "events": events})
        }
        return response.status(404).json({"result": false, "error": "Events with category id: " + category_id + " were not found."});
    } catch (error) {
        await logger("Warning", "Error getting events with category id: (" + category_id + ") " + error.message)
        return response.status(500).json({"result": false, "error": error.message })
    }
}

const searchEvent = async (request, response) => {
    const filter = request.query.filter;
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(searchEventQuery, [filter], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        if (events.length > 0) {
            await logger("Info", "Received all events with filter: " + filter);
            return response.status(200).json({"result": true, "events": events});
        }
        return response.status(404).json({"result": false, "error": "No events found with filter: " + filter});
    } catch (error) {
        await logger("Error", "Error getting events with filter (" + filter + "): " + error.message);
        return response.status(500).json({"result": false, "error": "Error getting events with filter (" + filter + "): " + error.message});
    }
}

module.exports = {
    getUpcoming,
    getAttending,
    filterByCategory,
    searchEvent
}