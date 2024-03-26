const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const pool = require("../../core/connection").pool;

const { createEventQuery, addPerformerIdQuery, addPerformerNameQuery } = require('./utils');

const createEvent = async (request, response) => {
    const { user_id, title, description, location, closing_date, performers } = request.body;
    try {
        const createdEvent = await new Promise((resolve, reject) => {
            pool.query(createEventQuery, [title, description, user_id, location, closing_date], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });

        const event_id = createdEvent[0].id;

        if (event_id != null) {
            await addPerformers(request, response, performers, event_id)
            await logger(request, response, Level.INFO, "Created new event with id: " + event_id);
            return response.status(200).json({"created_status": true});
        } else {
            await logger(request, response, Level.ERROR, "Error creating event: " + error.message);
            return response.status(500).json({ "error": "Unexpected error occurred while creating event" });
        }
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error creating event: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

const addPerformers = async (request, response, performers, event_id) => {
    try {
        await Promise.all(performers.map(async (performer) => {
            const {performer_id, firstname, lastname} = performer;
            if (performer_id != null) {
                await pool.query(addPerformerIdQuery, [event_id, performer_id]);
            } else {
                await pool.query(addPerformerNameQuery, [event_id, firstname, lastname]);
            }
        }));
        await logger(request, response, Level.INFO, "Added performers to event with id: (" + event_id + ")")
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error adding performers to event with id: (" + event_id + ") " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEvent,
    addPerformers
}