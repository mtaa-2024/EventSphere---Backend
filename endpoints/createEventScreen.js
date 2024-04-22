const { Level, logger } = require("./logs");
const pool = require("../core/connection").pool;
const { createEventQuery, addPerformerIdQuery, addPerformerNameQuery, addEventCategoryQuery } = require('./utils');

const addCategory = async (category, event_id) => {
    try {
        const addCategory = await new Promise((resolve, reject) => {
            pool.query(addEventCategoryQuery, [event_id, category], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error adding category to event with id: (" + event_id + ") " + error.message);
    }
}

const createEvent = async (request, response) => {
    const { user_id, title, description, location, latitude, longitude, estimated_end, performers, category } = request.body;

    try {
        const createdEvent = await new Promise((resolve, reject) => {
            pool.query(createEventQuery, [title, description, user_id, location, latitude, longitude, estimated_end], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });

        const event_id = createdEvent[0].id;

        if (event_id != null) {
            await addPerformers(request, response, performers, event_id)
            await addCategory(category, event_id)
            await logger("Info", "Created new event with id: " + event_id);
            return response.status(200).json({"result": true, "id": event_id});
        } else {
            await logger("Error", "Error creating event" );
            return response.status(200).json({"result": false, "error": "Unexpected error occurred while creating event" });
        }
    } catch (error) {
        await logger("Warning", "Error creating event: " + error.message);
        return response.status(500).json({"result": false, "error": error.message});
    }
}

const addPerformers = async (request, response, performers, event_id) => {
    try {
        for (const performer of performers) {
            const id = performer.id
            await new Promise((resolve, reject) => {
                pool.query(addPerformerIdQuery, [event_id, id], (error, results) => {
                    error ? reject(error) : resolve(results.rows);
                });
            });
        }
        await logger("Info", "Added performers to event with id: (" + event_id + ")")
    } catch (error) {
        await logger("Warning", "Error adding performers to event with id: (" + event_id + ") " + error.message);
    }
}

module.exports = {
    createEvent,
    addPerformers
}