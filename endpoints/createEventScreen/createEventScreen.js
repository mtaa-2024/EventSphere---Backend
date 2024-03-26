const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const { getEventQuery } = require("../eventScreen/utils");
const pool = require("../../core/connection").pool;

const { createEventQuery, addPerformerIdQuery, addPerformerNameQuery } = require('./utils');

const createEvent = async (request, response) => {
    const { user_id, title, description, location, closing_date, performers } = request.body;
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(createEventQuery, [title, description, user_id, location, closing_date], (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results.rows);
            });
        });

        const eventId = eventResult[0].id;

        try {
            await Promise.all(performers.map(async (performer) => {
                const { performer_id, firstname, lastname } = performer;
                if (performer_id != null) {
                    await pool.query(addPerformerIdQuery, [eventId, performer_id]);
                } else {
                    await pool.query(addPerformerNameQuery, [eventId, firstname, lastname]);
                }
            }));
            logger(request, response, Level.INFO, "Added performers to event (" + eventId + ")")
        } catch (error) {
            logger(request, response, Level.ERROR, "Error adding performer to event (" + eventId + "): " + error.message);
            return response.status(500).json({ error: error.message });
        }
        logger(request, response, Level.INFO, "Created new event with id: " + eventId);
        return response.status(200).json({ "created_status": true });
    } catch (error) {
        logger(request, response, Level.ERROR, "Error creating event: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEvent
}