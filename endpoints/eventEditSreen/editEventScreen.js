const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const {createEventQuery} = require("../createEventScreen/utils");
const pool = require("../../core/connection").pool;

const { updateEventQuery } = require('./utils')

const updateEvent = async (request, response) => {
    const { event_id, title, description, location, closing_date} = request.body;
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(updateEventQuery, [title, description, location, closing_date, event_id], (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results.rows);
            });
        });


        logger(request, response, Level.INFO, "Updated event with id: " + event_id);
        return response.status(200).json({ "updated_status": true });
    } catch (error) {
        logger(request, response, Level.ERROR, "Error updating event: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}


module.exports = {
    updateEvent
}