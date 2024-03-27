const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const pool = require("../../core/connection").pool;

const {updateTitleQuery, updateLocationQuery, updateDateQuery, updateDescriptionQuery, deletePerformersQuery } = require('./utils')
const { addPerformer } = require('../createEventScreen/createEventScreen')

const updateEvent = async (request, response) => {
    const { id, title, description, location, date, performers} = request.body;

    if (id == null) {
        await logger(request, response, Level.ERROR, "Error updating event: ID of event not provided");
        response.status(404).json({"error": "Missing event id"})
    }

    if (title != null)
        await updateTitle(request, response, id, title)
    if (description != null)
        await updateDescription(request, response, id, description)
    if (location != null)
        await updateLocation(request, response, id, location)
    if (date != null)
        await updateDate(request, response, id, date)
    if (performers != null)
        await updatePerformers(request, response, id, performers)

    await logger(request, response, Level.INFO, "Updated event with id: " + id);
    return response.status(200).json({ "updated_status": true });
}

const updateTitle = async (request, response, event_id, title) => {
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(updateTitleQuery, [event_id, title], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error updating title for event (" + id + "): " + error.message);
    }
}

const updateLocation = async (request, response, event_id, location) => {
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(updateLocationQuery, [event_id, location], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error updating location for event (" + id + "): " + error.message);
    }
}

const updateDate = async (request, response, event_id, date) => {
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(updateDateQuery, [event_id, date], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error updating date for event (" + id + "): " + error.message);
    }
}

const updateDescription = async (request, response, event_id, description) => {
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(updateDescriptionQuery, [event_id, description], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error updating description for event (" + id + "): " + error.message);
    }
}

const updatePerformers = async (request, response, event_id, performers) => {
    try {
        const eventResult = await new Promise((resolve, reject) => {
            pool.query(deletePerformersQuery, [event_id], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        try {
            await addPerformer(request, response, event_id, performers)
        } catch (error) {
            await logger(request, response, Level.ERROR, "Error adding performers to event (" + event_id + "): " + error.message);
        }
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error updating performers for event (" + event_id + "): " + error.message);
    }
}



module.exports = {
    updateEvent
}