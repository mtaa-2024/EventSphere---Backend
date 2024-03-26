const {request, response, json} = require("express");
const {Level, logger} = require("../logs");
const pool = require("../../core/connection").pool

const { getEventQuery, getEventCommentsQuery, getEventPerformersQuery } = require('./utils')

const getEvent = async (request, response) => {
    const id = request.body.id;
    try {
        const eventResults = await new Promise((resolve, reject) => {
            pool.query(getEventQuery, [id], (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results.rows);
            });
        });
        const comments = await getEventComments(request, response, id);
        const performers = await getEventPerformers(request, response, id)
        logger(request, response, Level.INFO, "Retrieved information for event with id: " + id);
        response.status(200).json({ 'event': eventResults, 'performers': performers, 'comments': comments });
    } catch (error) {
        logger(request, response, Level.ERROR, "Error retrieving event information: " + error.message);
        response.status(500).json({ error: error.message });
    }
}

const getEventComments = async (request, response, id) => {
    return new Promise((resolve, reject) => {
        pool.query(getEventCommentsQuery, [id], (error, results) => {
            if (error)
                reject(error);
            else
                resolve(results.rows);
        });
    });
}

const getEventPerformers = async (request, response, id) => {
    return new Promise((resolve, reject) => {
        pool.query(getEventPerformersQuery, [id], (error, results) => {
            if (error)
                reject(error);
            else
                resolve(results.rows);
        });
    });
}

module.exports = {
    getEvent
}