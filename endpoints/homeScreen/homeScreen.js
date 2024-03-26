const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const pool = require("../../core/connection").pool;

const { getUpcomingQuery, getAttendingQuery, filterByCategoryQuery, searchEventQuery } = require('./utils')

const getUpcoming = async (request, response) => {
    try {
        const eventResults = await new Promise((resolve, reject) => {
            pool.query(getUpcomingQuery, null, (error, results) => {
                if (error)
                    reject(error)
                else
                    resolve(results)
            })
        })
        logger(request, response, Level.INFO, "Received all upcoming events")
        response.status(200).json(eventResults.rows)
    } catch (error) {
        logger(request, response, Level.ERROR, "Error getting upcoming events: " + error.message)
        response.status(500).json({ "error": error.message })
    }
}

const getAttending = async (request, response) => {
    const id = request.body.id
    try {
        const eventResults = await new Promise((resolve, reject) => {
            pool.query(getAttendingQuery, [id], (error, results) => {
                if (error)
                    reject(error)
                else
                    resolve(results)
            })
        })
        logger(request, response, Level.INFO, "Received all attending events for user with id: " + id)
        response.status(200).json(eventResults.rows)
    } catch (error) {
        logger(request, response, Level.ERROR, "Error getting attending events for user with id: (" + id + ") " + error.message)
        response.status(500).json({ "error": error.message })
    }
}

const filterByCategory = async (request, response) => {
    const category_id = request.body.category_id
    try {
        const eventResults = await new Promise((resolve, reject) => {
            pool.query(filterByCategoryQuery, [category_id], (error, results) => {
                if (error)
                    reject(error)
                else
                    resolve(results)
            })
        })
        logger(request, response, Level.INFO, "Received all events with category id: " + category_id)
        response.status(200).json(eventResults.rows)
    } catch (error) {
        logger(request, response, Level.ERROR, "Error getting events with category id: (" + id + ") " + error.message)
        response.status(500).json({ "error": error.message })
    }
}

const searchEvent = async (request, response) => {
    const filter = request.body.filter
    try {
        const eventResults = await new Promise((resolve, reject) => {
            pool.query(searchEventQuery, [filter], (error, results) => {
                if (error)
                    reject(error)
                else
                    resolve(results)
            })
        })
        logger(request, response, Level.INFO, "Received all events with filter")
        response.status(200).json(eventResults.rows)
    } catch (error) {
        logger(request, response, Level.ERROR, "Error getting events with filter" + error.message)
        response.status(500).json({ "error": error.message })
    }
}

module.exports = {
    getUpcoming,
    getAttending,
    filterByCategory,
    searchEvent
}