const { Level, logger } = require("./logs");
const pool = require("../core/connection").pool;
const { createEventQuery, addPerformerIdQuery, addPerformerNameQuery } = require('./utils');

const createEvent = async (request, response) => {
    const { user_id, title, description, location, date, performers } = request.body;
    try {
        const createdEvent = await new Promise((resolve, reject) => {
            pool.query(createEventQuery, [title, description, user_id, location, date], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });

        const event_id = createdEvent[0].id;

        if (event_id != null) {
            await addPerformers(request, response, performers, event_id)
            await logger("Info", "Created new event with id: " + event_id);
            return response.status(200).json({"result": true});
        } else {
            await logger("Error", "Error creating event" );
            return response.status(400).json({ "result": false, "error": "Unexpected error occurred while creating event" });
        }
    } catch (error) {
        await logger("Warning", "Error creating event: " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
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
        await logger("Info", "Added performers to event with id: (" + event_id + ")")
    } catch (error) {
        await logger("Warning", "Error adding performers to event with id: (" + event_id + ") " + error.message);
    }
}

module.exports = {
    createEvent,
    addPerformers
}