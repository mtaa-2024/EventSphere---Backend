const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const { addPerformers } = require("./createEventScreen");
const { updateTitleQuery, updateLocationQuery, updateDateQuery, updateDescriptionQuery, deletePerformersQuery} = require('./utils')
const {request, response} = require("express");


const updateEvent = async (request, response) => {
    const { id, title, description, location, latitude, longitude, performers } = request.body;

    if (id == null) {
        await logger(request, response, "Error", "Error updating event: ID of event not provided");
        return response.status(200).json({"result": false, "error": "Missing event id"})
    }

    if (title != null)
        await updateTitle(id, title)
    if (description != null)
        await updateDescription(id, description)
    if (location != null)
        await updateLocation(id, location, parseFloat(latitude), parseFloat(longitude))
    if (performers != null)
        await updatePerformers(request, response, id, performers)

    await logger(request, response, "Info", "Updated event with id: " + id);
    return response.status(200).json({ "result": true });
}

const updateTitle = async (event_id, title) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(updateTitleQuery, [event_id, title], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error updating title for event (" + event_id + "): " + error.message);
    }
}

const updateLocation = async (event_id, location, latitude, longitude) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(updateLocationQuery, [event_id, location, latitude, longitude], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger( "Warning", "Error updating location for event (" + event_id + "): " + error.message);
    }
}


const updateDescription = async (event_id, description) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(updateDescriptionQuery, [event_id, description], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error updating description for event (" + event_id + "): " + error.message);
    }
}

const updatePerformers = async (request, response, event_id, performers) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(deletePerformersQuery, [event_id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        try {
            await addPerformers(request, response, performers, event_id)
        } catch (error) {
            await logger("Warning", "Error adding performers to event (" + event_id + "): " + error.message);
        }
    } catch (error) {
        await logger("Warning", "Error updating performers for event (" + event_id + "): " + error.message);
    }
}


module.exports = {
    updateEvent,
}