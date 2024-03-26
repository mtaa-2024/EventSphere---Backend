const {request, response} = require("express");
const pool = require("../core/connection").pool

const Level = {
    INFO: 1,
    DEBUG: 2,
    FATAL: 3,
    ERROR: 4,
}

const logger = async (request, response, level, message) => {
    pool.query('INSERT INTO logs (level, log, date) VALUES ($1, $2, NOW())', [level, message], (error, results) => {
        if (error) {
            throw error
        }
    })
}

module.exports = {
    logger,
    Level
}