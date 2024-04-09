const {request, response, json} = require("express");
const {Level, logger} = require("../logs");
const pool = require("../../core/connection").pool
const { getEventQuery, getEventCommentsQuery, getEventPerformersQuery } = require('./utils')

const getEvent = async (request, response) => {
    const id = request.body.id;
    try {
        const event = await new Promise((resolve, reject) => {
            pool.query(getEventQuery, [id], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        const comments = await getEventComments(request, response, id);
        const performers = await getEventPerformers(request, response, id)
        await logger(request, response, Level.INFO, "Received information for event with id: " + id);
        response.status(200).json({ 'event': event, 'performers': performers, 'comments': comments });
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error receiving event (" + id + ") information: " + error.message);
        response.status(500).json({ error: error.message });
    }
}

const getUpdatedComments = async(request, response) => {
    const id = request.body.id
    try {
        const comments = await getEventComments(request, response, id)
        await logger(request, response, Level.INFO, "Received updated comments for event with id: " + id);
        response.status(200).json({'comments': comments});
    } catch (error) {
        await logger(request, response, Level.ERROR, "Error receiving event (" + id + ") information: " + error.message);
        response.status(500).json({ error: error.message });
    }

}

const getEventComments = async (request, response, id) => {
    return new Promise((resolve, reject) => {
        pool.query(getEventCommentsQuery, [id], (error, results) => {
            if (error) reject(error); else resolve(results.rows);
        });
    });
}

const getEventPerformers = async (request, response, id) => {
    return new Promise((resolve, reject) => {
        pool.query(getEventPerformersQuery, [id], (error, results) => {
            if (error) reject(error); else resolve(results.rows);
        });
    });
}

module.exports = {
    getEvent,
    getUpdatedComments
}