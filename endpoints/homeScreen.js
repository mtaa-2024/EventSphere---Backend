const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { getUpcomingQuery, getAttendingQuery, filterByCategoryQuery, searchEventQuery } = require('./utils')

const getUpcoming = async (request, response) => {
    const {education, music, food, art, sport} = request.query
    let ids = [];

    if (education === 'false' && music === 'false' && food === 'false' && art === 'false' && sport === 'false') {
        ids.push("1");
        ids.push("2");
        ids.push("3");
        ids.push("4");
        ids.push("5");
    } else {
        if (education === 'true') ids.push("1");
        if (music === 'true') ids.push("2");
        if (food === 'true') ids.push("3");
        if (art === 'true') ids.push("4");
        if (sport === 'true') ids.push("5");
    }
    const arg = ids.join(',');
    try {
        const events = await new Promise((resolve, reject) => {

            pool.query(getUpcomingQuery(arg), null, (error, results) => {
                error ? reject(error) : resolve(results.rows);
            })
        })
        if (events.length > 0) {
            await logger("Info", "Received all upcoming events");
            return response.status(200).json({"result": true, "events": events});
        }
        return response.status(200).json({"result": false, "error": "No upcoming events"});
    } catch (error) {
        await logger("Warning", "Error getting upcoming events: " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
    }
}

const getAttending = async (request, response) => {
    const id = request.query.id;

    console.log(id)
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
        return response.status(200).json({"result": false, "error": "No attending events"});
    } catch (error) {
        await logger("Warning", "Error getting attending events for user with id: (" + id + ") " + error.message)
        return response.status(500).json({"result": false, "error": error.message})
    }
}

const searchEvent = async (request, response) => {
    const input = request.query.input;
    console.log(input)
    try {
        const events = await new Promise((resolve, reject) => {
            pool.query(searchEventQuery, [input], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        if (events.length > 0) {
            await logger("Info", "Received all events with filter: " + input);
            return response.status(200).json({"result": true, "events": events});
        }
        return response.status(200).json({"result": false, "error": "No events found with filter: " + input});
    } catch (error) {
        await logger("Error", "Error getting events with filter (" + input + "): " + error.message);
        return response.status(500).json({"result": false, "error": "Error getting events with filter (" + input + "): " + error.message});
    }
}

module.exports = {
    getUpcoming,
    getAttending,
    searchEvent
}